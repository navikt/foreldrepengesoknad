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
import { erAvslåttPeriode, finnAntallTidelerÅTrekke } from './periodeUtils';

export type DinPlanKvoteRad = {
    kontoType: KontoTypeUttak;
    bruktDager: number;
    tilgjengeligDager: number;
};

export type KvoteFordeling = {
    konto: KontoDto;
    brukteDager: number;
    trekteDager: number;
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
    const kvotefordeling = beregnKvoteFordeling(søkersPerioder, kontoer, familiesituasjon, familiehendelsedato);

    return DIN_PLAN_KVOTE_REKKEFØLGE.map((kontoType): DinPlanKvoteRad | undefined => {
        const fordeling = kvotefordeling.find((k) => k.konto.konto === kontoType);
        if (!fordeling || fordeling.konto.dager <= 0 || fordeling.brukteDager <= 0) {
            return undefined;
        }

        return {
            kontoType,
            bruktDager: fordeling.brukteDager,
            tilgjengeligDager: fordeling.konto.dager,
        };
    }).filter((rad): rad is DinPlanKvoteRad => rad !== undefined);
};

export const finnAntallDagerDerKunEnHarForeldrepenger = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const kvoter = beregnKvoteFordeling(uttakPerioder, valgtStønadskvote.kontoer, familiesituasjon, familiehendelsedato)
        .filter(({ konto }) =>
            ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].includes(konto.konto),
        )
        .map(({ konto, brukteDager }) => {
            const ubrukteDagerSkalTrekkes =
                konto.konto === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
            const ubrukteDager = konto.dager - brukteDager;
            return {
                brukteDager,
                ubrukteDager: ubrukteDagerSkalTrekkes ? 0 : Math.max(0, ubrukteDager),
                overtrukketDager: Math.max(0, -ubrukteDager),
            };
        });

    const antallOvertrukketDager = sumBy(kvoter, (kvote) => kvote.overtrukketDager);
    const antallUbrukteDager = sumBy(kvoter, (kvote) => kvote.ubrukteDager);
    const antallBrukteDager = sumBy(kvoter, (kvote) => kvote.brukteDager);

    return {
        antallOvertrukketDager,
        antallBrukteDager,
        antallUbrukteDager,
    };
};

export const beregnKvoteFordeling = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): KvoteFordeling[] => {
    const perioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);
    const fordelinger = kontoer.map((konto): KvoteFordeling => {
        const relevantePerioder = perioder.filter((p) => getUttaksKontoType(p, kontoer) === konto.konto);
        return {
            konto,
            brukteDager: summerDagerIPerioder(relevantePerioder, kontoer, familiesituasjon, familiehendelsedato),
            trekteDager: summerDagerIPerioder(
                relevantePerioder.filter(erAvslåttPeriode),
                kontoer,
                familiesituasjon,
                familiehendelsedato,
            ),
        };
    });
    const aktivitetsfri = fordelinger.find((k) => k.konto.konto === 'AKTIVITETSFRI_KVOTE');
    const medAktivitetskrav = fordelinger.find((k) => k.konto.konto === 'FORELDREPENGER');

    if (aktivitetsfri && medAktivitetskrav) {
        const vedtatteAktivitetsfrieDager = summerDagerIPerioder(
            perioder.filter(
                (p) =>
                    erVanligUttakPeriode(p) &&
                    p.resultat !== undefined &&
                    getUttaksKontoType(p, kontoer) === 'AKTIVITETSFRI_KVOTE',
            ),
            kontoer,
            familiesituasjon,
            familiehendelsedato,
        );

        // Bare vedtatt forbruk kan overstige minsteretten og belaste resten av stønadsperioden.
        const fraAktivitetsfri = Math.min(
            Math.max(0, vedtatteAktivitetsfrieDager - aktivitetsfri.konto.dager),
            medAktivitetskrav.konto.dager,
        );
        const trekteFraAktivitetsfri = Math.min(fraAktivitetsfri, aktivitetsfri.trekteDager);
        aktivitetsfri.brukteDager -= fraAktivitetsfri;
        aktivitetsfri.trekteDager -= trekteFraAktivitetsfri;
        medAktivitetskrav.brukteDager += fraAktivitetsfri;
        medAktivitetskrav.trekteDager += trekteFraAktivitetsfri;

        // Uttak med aktivitetskrav kan bruke hele stønadsperioden. Trekte dager vises først på FPMAK.
        const fraMedAktivitetskrav = Math.min(
            Math.max(0, medAktivitetskrav.brukteDager - medAktivitetskrav.konto.dager),
            Math.max(0, aktivitetsfri.konto.dager - aktivitetsfri.brukteDager),
        );
        const trekteFraMedAktivitetskrav = Math.max(
            0,
            fraMedAktivitetskrav - (medAktivitetskrav.brukteDager - medAktivitetskrav.trekteDager),
        );
        medAktivitetskrav.brukteDager -= fraMedAktivitetskrav;
        medAktivitetskrav.trekteDager -= trekteFraMedAktivitetskrav;
        aktivitetsfri.brukteDager += fraMedAktivitetskrav;
        aktivitetsfri.trekteDager += trekteFraMedAktivitetskrav;
    }

    return fordelinger;
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
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
    kontoSomSkalSummeres?: KontoTypeUttak,
) => {
    const aktuelleKontotyper = kontoSomSkalSummeres
        ? [kontoSomSkalSummeres]
        : new Set(
              perioder.map((p) => {
                  if (!('trekkdager' in p) && p.oppholdÅrsak) {
                      return getStønadskvoteTypeFromOppholdÅrsakType(p.oppholdÅrsak);
                  }

                  return getUttaksKontoType(p, kontoer);
              }),
          );

    const erFødsel = familiesituasjon === 'fødsel';

    // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil; sjå
    // finnAntallTidelerÅTrekke. Resultatet golvast til heile dagar heilt til slutt.
    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = kontoer.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tidelerEøs = Math.min(
            sum(
                perioder
                    .filter((p) => 'trekkdager' in p && getUttaksKontoType(p, kontoer) === aktuellKontoType)
                    .map((p) => finnAntallTidelerÅTrekke(p, erFødsel, familiehendelsedato)),
            ),
            gjeldendeKonto.dager * 10,
        );
        const tidelerNorge = sum(
            perioder
                .filter(
                    (p) =>
                        (!('trekkdager' in p) && getUttaksKontoType(p, kontoer) === aktuellKontoType) ||
                        harOppholdÅrsakLikKontoType(aktuellKontoType, p),
                )
                .map((p) => finnAntallTidelerÅTrekke(p, erFødsel, familiehendelsedato)),
        );
        tidelerTotalt += tidelerEøs + tidelerNorge;
    }

    return Math.floor(tidelerTotalt / 10);
};

export const getUttaksKontoType = (
    p: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    kontoer: KontoDto[],
): KontoTypeUttak | undefined => {
    if ('trekkdager' in p || p.kontoType !== 'FORELDREPENGER') {
        return p.kontoType;
    }

    const harAktivitetsfriKvote = kontoer.some((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const harKvoteMedAktivitetskrav = kontoer.some((k) => k.konto === 'FORELDREPENGER');

    if (!harAktivitetsfriKvote) {
        return 'FORELDREPENGER';
    }
    if (!harKvoteMedAktivitetskrav) {
        return 'AKTIVITETSFRI_KVOTE';
    }

    // Uten trekk setter fp-sak trekkerMinsterett=false uavhengig av mors aktivitet.
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
