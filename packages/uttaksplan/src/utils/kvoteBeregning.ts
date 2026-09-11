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

import { finnAntallTidelerÅTrekkeForEøs, finnAntallTidelerÅTrekkeForSide } from './periodeUtils';

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

type NorgeSide = { fom: string; tom: string; side: UttakDto_fpoversikt };
type EøsSide = { fom: string; tom: string; eøs: EøsUttakDto_fpoversikt };

// Flatar dei to sidene (søker/annenPart) ein periode kan ha uttak for, saman med tidsrommet
// deira, slik at dagsteljingane under kan handsame søkjar og annan part sine periodar likt –
// uavhengig av kven av dei som faktisk har uttak i det aktuelle tidsrommet.
const finnNorgeSider = (perioder: PeriodeDto_fpoversikt[]): NorgeSide[] =>
    perioder.flatMap((p) =>
        [
            p.søker && { fom: p.fom, tom: p.tom, side: p.søker },
            p.annenPart && { fom: p.fom, tom: p.tom, side: p.annenPart },
        ].filter((s): s is NorgeSide => s !== undefined),
    );

const finnEøsSider = (perioder: PeriodeDto_fpoversikt[]): EøsSide[] =>
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
    const søkersSider = uttakPerioder
        .map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger)
        .filter((periode) => periode.søker?.forelder === søkerRolle)
        .map((periode): NorgeSide => ({ fom: periode.fom, tom: periode.tom, side: periode.søker! }));

    return DIN_PLAN_KVOTE_REKKEFØLGE.map((kontoType): DinPlanKvoteRad | undefined => {
        const konto = kontoer.find((k) => k.konto === kontoType);
        if (!konto || konto.dager <= 0) {
            return undefined;
        }

        const relevanteSider = søkersSider.filter(({ side }) => getUttaksKontoType(side) === kontoType);
        const bruktDager = summerDagerForNorgeSider(relevanteSider, [konto], familiesituasjon, familiehendelsedato);

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
    const norgeSider = finnNorgeSider(uttakPerioder);

    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = valgtStønadskvote.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerForNorgeSider(
            norgeSider.filter(({ side }) => {
                const harMatchendeSide =
                    getUttaksKontoType(side) === 'FORELDREPENGER' && side.morsAktivitet === 'IKKE_OPPGITT';
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = getUttaksKontoType(side) === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    return harMatchendeSide || harMatchendeKonto;
                }

                // Disse sidene skal kun telles for aktivitetsfri kvoter
                if (harMatchendeSide) {
                    return false;
                }

                return kontoType === getUttaksKontoType(side);
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

const sideTrekkerDager = (side: UttakDto_fpoversikt): boolean => {
    // Utsettelseperiodar trekker ikkje dagar frå kvoten og skal ikkje reknast med.
    if (side.utsettelseÅrsak !== undefined && side.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER') {
        return false;
    }

    return side.resultat?.trekkerDager ?? true;
};

/** Fjernar søker/annenPart-sider som er utsettelsar eller avslag utan trekkdagar (behold pleiepenger). */
export const filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger = (
    periode: PeriodeDto_fpoversikt,
): PeriodeDto_fpoversikt => ({
    ...periode,
    søker: periode.søker && sideTrekkerDager(periode.søker) ? periode.søker : undefined,
    annenPart: periode.annenPart && sideTrekkerDager(periode.annenPart) ? periode.annenPart : undefined,
});

export const tellDagerIUttaksPeriodene = (
    uttakPerioder: PeriodeDto_fpoversikt[],
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const norgeSider = finnNorgeSider(uttakPerioder);

    const dagerBruktAvMorFørFødsel = summerDagerForNorgeSider(
        norgeSider.filter(({ side }) => getUttaksKontoType(side) === 'FORELDREPENGER_FØR_FØDSEL'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvMor = summerDagerForNorgeSider(
        norgeSider.filter(
            ({ side }) =>
                getUttaksKontoType(side) === 'FORELDREPENGER_FØR_FØDSEL' || getUttaksKontoType(side) === 'MØDREKVOTE',
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvFar = summerDagerForNorgeSider(
        norgeSider.filter(({ side }) => getUttaksKontoType(side) === 'FEDREKVOTE'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerFellesBrukt = summerDagerForNorgeSider(
        norgeSider.filter(({ side }) => getUttaksKontoType(side) === 'FELLESPERIODE'),
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

/** Summerer trekkdagar (i heile dagar) for eit sett av norske uttakssider mot ein konto. */
const summerDagerForNorgeSider = (
    norgeSider: NorgeSide[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const erFødsel = familiesituasjon === 'fødsel';

    const aktuelleKontotyper = new Set(norgeSider.map(({ side }) => getUttaksKontoType(side)));

    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tideler = sum(
            norgeSider
                .filter(({ side }) => getUttaksKontoType(side) === aktuellKontoType)
                .map(({ fom, tom, side }) => finnAntallTidelerÅTrekkeForSide({ fom, tom }, side, erFødsel, familiehendelsedato)),
        );
        tidelerTotalt += tideler;
    }

    return Math.floor(tidelerTotalt / 10);
};

/** Summerer trekkdagar (i heile dagar) mot ein konto, avgrensa til éin forelder si side av kvar periode. */
export const summerDagerForForelder = (
    perioder: PeriodeDto_fpoversikt[],
    forelder: BrukerRolleSak_fpoversikt,
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const norgeSider = finnNorgeSider(perioder).filter(({ side }) => side.forelder === forelder);
    return summerDagerForNorgeSider(norgeSider, konto, familiesituasjon, familiehendelsedato);
};

/**
 * Summerer trekkdagar (i heile dagar) for norske uttakssider OG eventuelle EØS-sider mot ein
 * konto, avgrensa til maks tal dagar kontoen har igjen for EØS-delen (matchar tidlegare åtferd).
 */
export const summerDagerIPerioder = (
    perioder: PeriodeDto_fpoversikt[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
) => {
    const norgeSider = finnNorgeSider(perioder);
    const eøsSider = finnEøsSider(perioder);

    const aktuelleKontotyper = new Set([
        ...norgeSider.map(({ side }) => getUttaksKontoType(side)),
        ...eøsSider.map(({ eøs }) => eøs.kontoType),
    ]);

    const erFødsel = familiesituasjon === 'fødsel';

    // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil; sjå
    // finnAntallTidelerÅTrekkeForSide. Resultatet golvast til heile dagar heilt til slutt.
    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tidelerEøs = Math.min(
            sum(
                eøsSider
                    .filter(({ eøs }) => eøs.kontoType === aktuellKontoType)
                    .map(({ eøs }) => finnAntallTidelerÅTrekkeForEøs(eøs)),
            ),
            gjeldendeKonto.dager * 10,
        );
        const tidelerNorge = sum(
            norgeSider
                .filter(({ side }) => getUttaksKontoType(side) === aktuellKontoType)
                .map(({ fom, tom, side }) => finnAntallTidelerÅTrekkeForSide({ fom, tom }, side, erFødsel, familiehendelsedato)),
        );
        tidelerTotalt += tidelerEøs + tidelerNorge;
    }

    return Math.floor(tidelerTotalt / 10);
};

export const getUttaksKontoType = (side: UttakDto_fpoversikt): KontoTypeUttak | undefined => {
    if (side.kontoType === 'FORELDREPENGER' && side.morsAktivitet === 'IKKE_OPPGITT') {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return side.kontoType;
};
