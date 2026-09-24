import { sum, sumBy } from 'es-toolkit';

import {
    BrukerRolleSak_fpoversikt,
    EøsUttakDto_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    KontoTypeUttak,
    PeriodeDto_fpoversikt,
    UttakDto_fpoversikt,
} from '@navikt/fp-types';

import { finnAntallTidelerÅTrekkeForEøs, finnAntallTidelerÅTrekkeForPart } from './periodeUtils';

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

type NorgePart = { fom: string; tom: string; part: UttakDto_fpoversikt };
type EøsPart = { fom: string; tom: string; eøs: EøsUttakDto_fpoversikt };

// Flatar dei to partane (søker/annenPart) ein periode kan ha uttak for, saman med tidsrommet
// deira, slik at dagsteljingane under kan handsame søkjar og annan part sine periodar likt –
// uavhengig av kven av dei som faktisk har uttak i det aktuelle tidsrommet.
const finnNorgeParter = (perioder: PeriodeDto_fpoversikt[]): NorgePart[] =>
    perioder.flatMap((p) =>
        [
            p.søker && { fom: p.fom, tom: p.tom, part: p.søker },
            p.annenPart && { fom: p.fom, tom: p.tom, part: p.annenPart },
        ].filter((s): s is NorgePart => s !== undefined),
    );

const finnEøsParter = (perioder: PeriodeDto_fpoversikt[]): EøsPart[] =>
    perioder.flatMap((p) => (p.annenPartEøs ? [{ fom: p.fom, tom: p.tom, eøs: p.annenPartEøs }] : []));

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
    uttakPerioder: PeriodeDto_fpoversikt[],
    søkerRolle: BrukerRolleSak_fpoversikt,
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): DinPlanKvoteRad[] => {
    const søkersParter = uttakPerioder
        .map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger)
        .filter((periode) => periode.søker?.forelder === søkerRolle)
        .map((periode): NorgePart => ({ fom: periode.fom, tom: periode.tom, part: periode.søker! }));

    return DIN_PLAN_KVOTE_REKKEFØLGE.map((kontoType): DinPlanKvoteRad | undefined => {
        const konto = kontoer.find((k) => k.konto === kontoType);
        if (!konto || konto.dager <= 0) {
            return undefined;
        }

        const relevanteParter = søkersParter.filter(({ part }) => getUttaksKontoType(part) === kontoType);
        const bruktDager = summerDagerForNorgeParter(relevanteParter, [konto], familiesituasjon, familiehendelsedato);

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
    uttakPerioder: PeriodeDto_fpoversikt[],
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const norgeParter = finnNorgeParter(uttakPerioder);

    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = valgtStønadskvote.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerForNorgeParter(
            norgeParter.filter(({ part }) => {
                const harMatchendePart =
                    getUttaksKontoType(part) === 'FORELDREPENGER' && part.morsAktivitet === 'IKKE_OPPGITT';
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = getUttaksKontoType(part) === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    return harMatchendePart || harMatchendeKonto;
                }

                // Desse partane skal kun telles for aktivitetsfri kvoter
                if (harMatchendePart) {
                    return false;
                }

                return kontoType === getUttaksKontoType(part);
            }),
            valgtStønadskvote.kontoer,
            familiesituasjon,
            familiehendelsedato,
        );
        const ubrukteDager = aktuellKonto.dager - brukteDager;
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

const partTrekkerDager = (part: UttakDto_fpoversikt): boolean => {
    // Utsettelseperiodar trekker ikkje dagar frå kvoten og skal ikkje reknast med.
    if (part.utsettelseÅrsak !== undefined && part.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER') {
        return false;
    }

    return part.resultat?.trekkerDager ?? true;
};

/** Fjernar søker- og annenPart-uttak som er utsettelsar eller avslag utan trekkdagar (behold pleiepenger). */
export const filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger = (
    periode: PeriodeDto_fpoversikt,
): PeriodeDto_fpoversikt => ({
    ...periode,
    søker: periode.søker && partTrekkerDager(periode.søker) ? periode.søker : undefined,
    annenPart: periode.annenPart && partTrekkerDager(periode.annenPart) ? periode.annenPart : undefined,
});

export const tellDagerIUttaksPeriodene = (
    uttakPerioder: PeriodeDto_fpoversikt[],
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const norgeParter = finnNorgeParter(uttakPerioder);

    const dagerBruktAvMorFørFødsel = summerDagerForNorgeParter(
        norgeParter.filter(({ part }) => getUttaksKontoType(part) === 'FORELDREPENGER_FØR_FØDSEL'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvMor = summerDagerForNorgeParter(
        norgeParter.filter(
            ({ part }) =>
                getUttaksKontoType(part) === 'FORELDREPENGER_FØR_FØDSEL' || getUttaksKontoType(part) === 'MØDREKVOTE',
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvFar = summerDagerForNorgeParter(
        norgeParter.filter(({ part }) => getUttaksKontoType(part) === 'FEDREKVOTE'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerFellesBrukt = summerDagerForNorgeParter(
        norgeParter.filter(({ part }) => getUttaksKontoType(part) === 'FELLESPERIODE'),
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

/** Summerer trekkdagar (i heile dagar) for eit sett av norske uttaksparter mot ein konto. */
const summerDagerForNorgeParter = (
    norgeParter: NorgePart[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const erFødsel = familiesituasjon === 'fødsel';

    const aktuelleKontotyper = new Set(norgeParter.map(({ part }) => getUttaksKontoType(part)));

    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tideler = sum(
            norgeParter
                .filter(({ part }) => getUttaksKontoType(part) === aktuellKontoType)
                .map(({ fom, tom, part }) =>
                    finnAntallTidelerÅTrekkeForPart({ fom, tom }, part, erFødsel, familiehendelsedato),
                ),
        );
        tidelerTotalt += tideler;
    }

    return Math.floor(tidelerTotalt / 10);
};

/** Summerer trekkdagar (i heile dagar) mot ein konto, avgrensa til éin forelder sin part av kvar periode. */
export const summerDagerForForelder = (
    perioder: PeriodeDto_fpoversikt[],
    forelder: BrukerRolleSak_fpoversikt,
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const norgeParter = finnNorgeParter(perioder).filter(({ part }) => part.forelder === forelder);
    return summerDagerForNorgeParter(norgeParter, konto, familiesituasjon, familiehendelsedato);
};

/**
 * Summerer trekkdagar (i heile dagar) for norske uttaksparter OG eventuelle EØS-parter mot ein
 * konto, avgrensa til maks tal dagar kontoen har igjen for EØS-delen (matchar tidlegare åtferd).
 */
export const summerDagerIPerioder = (
    perioder: PeriodeDto_fpoversikt[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
) => {
    const norgeParter = finnNorgeParter(perioder);
    const eøsParter = finnEøsParter(perioder);

    const aktuelleKontotyper = new Set([
        ...norgeParter.map(({ part }) => getUttaksKontoType(part)),
        ...eøsParter.map(({ eøs }) => eøs.kontoType),
    ]);

    const erFødsel = familiesituasjon === 'fødsel';

    // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil; sjå
    // finnAntallTidelerÅTrekkeForPart. Resultatet golvast til heile dagar heilt til slutt.
    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tidelerEøs = Math.min(
            sum(
                eøsParter
                    .filter(({ eøs }) => eøs.kontoType === aktuellKontoType)
                    .map(({ eøs }) => finnAntallTidelerÅTrekkeForEøs(eøs)),
            ),
            gjeldendeKonto.dager * 10,
        );
        const tidelerNorge = sum(
            norgeParter
                .filter(({ part }) => getUttaksKontoType(part) === aktuellKontoType)
                .map(({ fom, tom, part }) =>
                    finnAntallTidelerÅTrekkeForPart({ fom, tom }, part, erFødsel, familiehendelsedato),
                ),
        );
        tidelerTotalt += tidelerEøs + tidelerNorge;
    }

    return Math.floor(tidelerTotalt / 10);
};

const getUttaksKontoType = (part: UttakDto_fpoversikt): KontoTypeUttak | undefined => {
    if (part.kontoType === 'FORELDREPENGER' && part.morsAktivitet === 'IKKE_OPPGITT') {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return part.kontoType;
};
