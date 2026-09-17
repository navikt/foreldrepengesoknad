import { sum, sumBy } from 'es-toolkit';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    KontoTypeUttak,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { erEøsUttakPeriode, erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { finnAntallTidelerÅTrekke } from './periodeUtils';

export type DinPlanKvoteRad = {
    kontoType: KontoTypeUttak;
    bruktDager: number;
    tilgjengeligDager: number;
};

// Rekkefølga radene skal visast i «Du har planlagt»-lista i oppsummeringssteget.
const DIN_PLAN_KVOTE_REKKEFØLGE: KontoTypeUttak[] = [
    'FORELDREPENGER_FØR_FØDSEL',
    'MØDREKVOTE',
    'FEDREKVOTE',
    'AKTIVITETSFRI_KVOTE',
    'FORELDREPENGER',
    'FELLESPERIODE',
];

/**
 * Finn kor mange dagar søkjaren har planlagt å bruke av kvar stønadskonto,
 * samanlikna med kor mange dagar som er tilgjengelege totalt på den kontoen.
 * Brukt til å byggja opp «Du har planlagt»-lista i oppsummeringssteget.
 *
 * Reknar kun med søkjaren sine eigne periodar (ikkje periodar den andre
 * forelderen har lagt inn i den same uttaksplanen), sidan det er søkjaren sin
 * eigen søknad som skal oppsummerast her. Ein konto blir kun teken med dersom
 * søkjaren faktisk har planlagt å bruke noko av han.
 */
export const finnDinPlanKvoteRader = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    søkerRolle: BrukerRolleSak_fpoversikt,
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): DinPlanKvoteRad[] => {
    const søkersPerioder = uttakPerioder
        .filter(
            (periode): periode is UttakPeriode_fpoversikt => 'forelder' in periode && periode.forelder === søkerRolle,
        )
        .filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return DIN_PLAN_KVOTE_REKKEFØLGE.map((kontoType): DinPlanKvoteRad | undefined => {
        const konto = kontoer.find((k) => k.konto === kontoType);
        if (!konto || konto.dager <= 0) {
            return undefined;
        }

        const relevantePerioder = søkersPerioder.filter((p) => getUttaksKontoType(p, kontoer) === kontoType);
        const bruktDager = summerDagerIPerioder(relevantePerioder, [konto], familiesituasjon, familiehendelsedato);

        if (bruktDager <= 0) {
            return undefined;
        }

        return {
            kontoType,
            bruktDager,
            tilgjengeligDager: konto.dager,
        };
    }).filter((rad): rad is DinPlanKvoteRad => rad !== undefined);
};

export const finnAntallDagerDerKunEnHarForeldrepenger = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const kontoer = valgtStønadskvote.kontoer;
    const overførteDager = finnOverførteDagerFraAktivitetsfriKvote(
        uttakPerioder,
        kontoer,
        familiesituasjon,
        familiehendelsedato,
    );

    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerIPerioder(
            uttakPerioder.filter((p) => kontoType === getUttaksKontoType(p, kontoer)),
            kontoer,
            familiesituasjon,
            familiehendelsedato,
        );
        const ubrukteDager = justerKvoteForOverførteDager(kontoType, aktuellKonto.dager, overførteDager) - brukteDager;
        const overtrukketDager = ubrukteDager * -1;

        return {
            kontoType,
            brukteDager,
            ubrukteDager: ubrukteDagerSkalTrekkes ? 0 : ubrukteDager,
            overtrukketDager,
        };
    });

    const antallOvertrukketDager = sumBy(
        kvoter.filter((kvote) => (kvote?.overtrukketDager ?? 0) > 0),
        (kvote) => kvote?.overtrukketDager ?? 0,
    );
    const antallUbrukteDager = sumBy(
        kvoter.filter((kvote) => (kvote?.ubrukteDager ?? 0) > 0),
        (kvote) => kvote?.ubrukteDager ?? 0,
    );
    const antallBrukteDager = sumBy(
        kvoter.filter((kvote) => (kvote?.brukteDager ?? 0) > 0),
        (kvote) => kvote?.brukteDager ?? 0,
    );

    return {
        antallOvertrukketDager,
        antallBrukteDager,
        antallUbrukteDager,
    };
};

/**
 * Ein vedteken periode er ferdigbehandla av fp-sak og har eit resultat.
 * Planlagde periodar (planlegger og nye periodar i søknad) har det ikkje.
 */
const erVedtattPeriode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) =>
    erVanligUttakPeriode(periode) && periode.resultat !== undefined;

/**
 * Finn kor mange dagar som er «omfordelte» frå kvoten med aktivitetskrav til den
 * aktivitetsfrie kvoten.
 *
 * Etter ftrl. § 14-14 er retten til uttak utan aktivitetskrav eit tak på 50
 * stønadsdagar inne i éin felles stønadsperiode – ikkje ein eigen pott. Samstundes
 * reduserast stønadsperioden løpande når aktivitetskravet ikkje er oppfylt, slik at
 * samla forbruk utan aktivitetskrav kan bli større enn taket. fp-sak dekker då
 * overskytinga frå resten av stønadsperioden.
 *
 * Vi speglar det ved å la overtrekk frå *vedtekne* periodar redusere kvoten med
 * aktivitetskrav. Planlagde dagar flyt derimot ikkje over: taket i § 14-14 tredje
 * ledd er ei materiell grense, og ein plan som bryt det ville uansett blitt avslegen.
 */
export const finnOverførteDagerFraAktivitetsfriKvote = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const aktivitetsfriKonto = kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const kontoMedAktivitetskrav = kontoer.find((k) => k.konto === 'FORELDREPENGER');

    if (aktivitetsfriKonto === undefined || kontoMedAktivitetskrav === undefined) {
        return 0;
    }

    const vedtatteAktivitetsfriDager = summerDagerIPerioder(
        uttakPerioder.filter((p) => erVedtattPeriode(p) && getUttaksKontoType(p, kontoer) === 'AKTIVITETSFRI_KVOTE'),
        kontoer,
        familiesituasjon,
        familiehendelsedato,
    );

    // Aldri lån meir enn kvoten med aktivitetskrav faktisk inneheld, slik at ho ikkje
    // kan bli negativ i visninga.
    return Math.min(Math.max(0, vedtatteAktivitetsfriDager - aktivitetsfriKonto.dager), kontoMedAktivitetskrav.dager);
};

/** Aktivitetsfri kvote lånar dagar frå kvoten med aktivitetskrav, jf. omfordelinga over. */
const justerKvoteForOverførteDager = (kontoType: string, dager: number, overførteDager: number) => {
    if (kontoType === 'AKTIVITETSFRI_KVOTE') {
        return dager + overførteDager;
    }
    if (kontoType === 'FORELDREPENGER') {
        return dager - overførteDager;
    }
    return dager;
};

export const filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    if (erEøsUttakPeriode(periode)) {
        return true;
    }

    // Utsettelseperiodar trekker ikkje dagar frå kvoten og skal ikkje reknast med.
    if (periode.utsettelseÅrsak !== undefined && periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER') {
        return false;
    }

    return periode.resultat?.trekkerDager ?? true;
};

export const tellDagerIUttaksPeriodene = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const dagerBruktAvMorFørFødsel = summerDagerIPerioder(
        uttakPerioder.filter((p) => getUttaksKontoType(p, valgtStønadskvote.kontoer) === 'FORELDREPENGER_FØR_FØDSEL'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvMor = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p, valgtStønadskvote.kontoer) === 'FORELDREPENGER_FØR_FØDSEL' ||
                getUttaksKontoType(p, valgtStønadskvote.kontoer) === 'MØDREKVOTE' ||
                (erVanligUttakPeriode(p) && p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER'),
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvFar = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p, valgtStønadskvote.kontoer) === 'FEDREKVOTE' ||
                (erVanligUttakPeriode(p) && p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'),
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerFellesBrukt = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p, valgtStønadskvote.kontoer) === 'FELLESPERIODE' ||
                (erVanligUttakPeriode(p) && p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );

    const barnetErFødt = familiesituasjon === 'fødsel';

    const fedreKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const førFødselKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødreKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fellesKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    // Dersom barnet er født skal vi se bortifra ubrukte dager på mor sin "3 uker før fødsel" konto.
    const dagerFørFødselSomTellerMed = barnetErFødt ? dagerBruktAvMorFørFødsel : (førFødselKonto?.dager ?? 0);
    const ubrukteDagerMor =
        mødreKonto && førFødselKonto ? mødreKonto.dager + dagerFørFødselSomTellerMed - dagerBruktAvMor : 0;
    const ubrukteDagerFar = fedreKonto ? fedreKonto.dager - dagerBruktAvFar : 0;
    const ubrukteDagerFelles = fellesKonto ? fellesKonto.dager - dagerFellesBrukt : 0;
    const antallUbrukteDager = sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles]);

    const antallOvertrukketDager =
        sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles].filter((d) => d < 0)) * -1;

    return {
        antallOvertrukketDager,
        antallUbrukteDager,
        ubrukteDagerMor,
        ubrukteDagerFar,
        ubrukteDagerFelles,
        dagerBruktAvMor,
        dagerBruktAvFar,
        dagerFellesBrukt,
    };
};

export const summerDagerIPerioder = (
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
) => {
    const aktuelleKontotyper = new Set(
        perioder.map((p) => {
            if (!('trekkdager' in p) && p.oppholdÅrsak) {
                return getStønadskvoteTypeFromOppholdÅrsakType(p.oppholdÅrsak);
            }

            return getUttaksKontoType(p, konto);
        }),
    );

    if (aktuelleKontotyper === undefined) {
        return 0;
    }

    const erFødsel = familiesituasjon === 'fødsel';

    // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil; sjå
    // finnAntallTidelerÅTrekke. Resultatet golvast til heile dagar heilt til slutt.
    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tidelerEøs = Math.min(
            sum(
                perioder
                    .filter((p) => 'trekkdager' in p && getUttaksKontoType(p, konto) === aktuellKontoType)
                    .map((p) => finnAntallTidelerÅTrekke(p, erFødsel, familiehendelsedato)),
            ),
            gjeldendeKonto.dager * 10,
        );
        const tidelerNorge = sum(
            perioder
                .filter(
                    (p) =>
                        (!('trekkdager' in p) && getUttaksKontoType(p, konto) === aktuellKontoType) ||
                        harOppholdÅrsakLikKontoType(aktuellKontoType, p),
                )
                .map((p) => finnAntallTidelerÅTrekke(p, erFødsel, familiehendelsedato)),
        );
        tidelerTotalt += tidelerEøs + tidelerNorge;
    }

    return Math.floor(tidelerTotalt / 10);
};

/**
 * Avgjer kva stønadskonto ein periode skal bokførast på.
 *
 * Bakgrunn: fp-sak har berre EIN konto for BFHR (FORELDREPENGER), der retten til
 * uttak utan aktivitetskrav etter ftrl. § 14-14 tredje ledd er eit *tak* på 50
 * stønadsdagar inne i den same kontoen – ikkje ein eigen pott. Frontend deler
 * kontoen i to (AKTIVITETSFRI_KVOTE + FORELDREPENGER) som til saman utgjer totalen.
 *
 * For periodar som alt er vedtekne er `resultat.trekkerMinsterett` fasiten frå
 * fp-sak, og den må gå føre den lokale morsAktivitet-heuristikken. Ein avslegen
 * periode som likevel trekker dagar («raud pølse», jf. § 14-14 fjerde ledd om at
 * stønadsperioden reduserast løpande) har typisk morsAktivitet sett til noko anna
 * enn IKKE_OPPGITT, men trekker like fullt av minsteretten.
 */
export const getUttaksKontoType = (
    p: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    kontoer: KontoDto[],
): KontoTypeUttak | undefined => {
    if ('trekkdager' in p || p.kontoType !== 'FORELDREPENGER') {
        return p.kontoType;
    }

    const harAktivitetsfriKvote = kontoer.some((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const harKvoteMedAktivitetskrav = kontoer.some((k) => k.konto === 'FORELDREPENGER');

    // Aleneomsorg og begge-rett har inga aktivitetsfri kvote, og far+far ved
    // fødsel/adopsjon har berre aktivitetsfri kvote. Utan desse vaktene ville
    // dagar blitt bokførte på ein konto som ikkje finst, og forsvunne ut av
    // rekneskapet.
    if (!harAktivitetsfriKvote) {
        return 'FORELDREPENGER';
    }
    if (!harKvoteMedAktivitetskrav) {
        return 'AKTIVITETSFRI_KVOTE';
    }

    // Vedtekne periodar som trekker dagar: bruk fp-sak sin klassifisering.
    // Periodar utan trekk får trekkerMinsterett=false frå fp-sak uansett, og må
    // difor klassifiserast på morsAktivitet for å få rett farge og kvotenamn i
    // kalender og liste.
    if (p.resultat !== undefined && p.resultat.trekkerDager) {
        return p.resultat.trekkerMinsterett ? 'AKTIVITETSFRI_KVOTE' : 'FORELDREPENGER';
    }

    return p.morsAktivitet === 'IKKE_OPPGITT' ? 'AKTIVITETSFRI_KVOTE' : 'FORELDREPENGER';
};

const harOppholdÅrsakLikKontoType = (
    kontoType: KontoTypeUttak,
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): boolean => {
    if (erEøsUttakPeriode(periode) || !periode.oppholdÅrsak) {
        return false;
    }

    const stønadskontoType = getStønadskvoteTypeFromOppholdÅrsakType(periode.oppholdÅrsak);
    return stønadskontoType === kontoType;
};

const getStønadskvoteTypeFromOppholdÅrsakType = (årsak: UttakOppholdÅrsak_fpoversikt): KontoTypeUttak | undefined => {
    switch (årsak) {
        case 'FEDREKVOTE_ANNEN_FORELDER':
            return 'FEDREKVOTE';
        case 'FELLESPERIODE_ANNEN_FORELDER':
            return 'FELLESPERIODE';
        case 'MØDREKVOTE_ANNEN_FORELDER':
            return 'MØDREKVOTE';
        case 'FORELDREPENGER_ANNEN_FORELDER':
            return 'FORELDREPENGER';
        default:
            return undefined;
    }
};
