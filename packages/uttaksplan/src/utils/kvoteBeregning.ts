import { sum, sumBy } from 'es-toolkit';

import {
    BrukerRolleSak_fpoversikt,
    EøsUttakDto,
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    KontoTypeUttak,
    UttakDto,
    UttakPeriodeDto,
} from '@navikt/fp-types';

import { finnAntallTidelerÅTrekkeForEøs, finnAntallTidelerÅTrekkeForUttak } from './periodeUtils';

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

type NorgeUttak = { fom: string; tom: string; uttak: UttakDto };
type EøsUttak = { fom: string; tom: string; eøs: EøsUttakDto };

// Flatar dei to partane (søker/annenPart) ein periode kan ha uttak for, saman med tidsrommet
// deira, slik at dagsteljingane under kan handsame søkjar og annan part sine periodar likt –
// uavhengig av kven av dei som faktisk har uttak i det aktuelle tidsrommet.
const finnAlleNorgeUttak = (perioder: UttakPeriodeDto[]): NorgeUttak[] =>
    perioder.flatMap((p) =>
        [
            p.søker && { fom: p.fom, tom: p.tom, uttak: p.søker },
            p.annenPart && { fom: p.fom, tom: p.tom, uttak: p.annenPart },
        ].filter((s): s is NorgeUttak => s !== undefined),
    );

const finnAlleEøsUttak = (perioder: UttakPeriodeDto[]): EøsUttak[] =>
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
    uttakPerioder: UttakPeriodeDto[],
    søkerRolle: BrukerRolleSak_fpoversikt,
    kontoer: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): DinPlanKvoteRad[] => {
    const alleSøkersUttak = uttakPerioder
        .map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger)
        .filter((periode) => periode.søker?.forelder === søkerRolle)
        .map((periode): NorgeUttak => ({ fom: periode.fom, tom: periode.tom, uttak: periode.søker! }));

    return DIN_PLAN_KVOTE_REKKEFØLGE.map((kontoType): DinPlanKvoteRad | undefined => {
        const konto = kontoer.find((k) => k.konto === kontoType);
        if (!konto || konto.dager <= 0) {
            return undefined;
        }

        const relevanteUttak = alleSøkersUttak.filter(({ uttak }) => getUttaksKontoType(uttak) === kontoType);
        const bruktDager = summerDagerForUttak(relevanteUttak, [], [konto], familiesituasjon, familiehendelsedato);

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
    uttakPerioder: UttakPeriodeDto[],
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const alleNorgeUttak = finnAlleNorgeUttak(uttakPerioder);
    const alleEøsUttak = finnAlleEøsUttak(uttakPerioder);

    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = valgtStønadskvote.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerForUttak(
            alleNorgeUttak.filter(({ uttak }) => {
                const harMatchendeUttak =
                    getUttaksKontoType(uttak) === 'FORELDREPENGER' && uttak.morsAktivitet === 'IKKE_OPPGITT';
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = getUttaksKontoType(uttak) === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    return harMatchendeUttak || harMatchendeKonto;
                }

                // Desse partane skal kun telles for aktivitetsfri kvoter
                if (harMatchendeUttak) {
                    return false;
                }

                return kontoType === getUttaksKontoType(uttak);
            }),
            alleEøsUttak.filter(({ eøs }) => eøs.kontoType === kontoType),
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

const uttakTrekkerDager = (uttak: UttakDto): boolean => {
    // Utsettelseperiodar trekker ikkje dagar frå kvoten og skal ikkje reknast med.
    if (uttak.utsettelseÅrsak !== undefined && uttak.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER') {
        return false;
    }

    return uttak.resultat?.trekkerDager ?? true;
};

/** Fjernar søker- og annenPart-uttak som er utsettelsar eller avslag utan trekkdagar (behold pleiepenger). */
export const filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger = (
    periode: UttakPeriodeDto,
): UttakPeriodeDto => ({
    ...periode,
    søker: periode.søker && uttakTrekkerDager(periode.søker) ? periode.søker : undefined,
    annenPart: periode.annenPart && uttakTrekkerDager(periode.annenPart) ? periode.annenPart : undefined,
});

export const tellDagerIUttaksPeriodene = (
    uttakPerioder: UttakPeriodeDto[],
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const alleNorgeUttak = finnAlleNorgeUttak(uttakPerioder);
    const alleEøsUttak = finnAlleEøsUttak(uttakPerioder);

    const summerDagerForKontotyper = (kontotyper: KontoTypeUttak[]) => {
        const erAktuell = (kontoType: KontoTypeUttak | undefined) =>
            kontoType !== undefined && kontotyper.includes(kontoType);
        return summerDagerForUttak(
            alleNorgeUttak.filter(({ uttak }) => erAktuell(getUttaksKontoType(uttak))),
            alleEøsUttak.filter(({ eøs }) => erAktuell(eøs.kontoType)),
            valgtStønadskvote.kontoer,
            familiesituasjon,
            familiehendelsedato,
        );
    };

    const dagerBruktAvMorFørFødsel = summerDagerForKontotyper(['FORELDREPENGER_FØR_FØDSEL']);
    const dagerBruktAvMor = summerDagerForKontotyper(['FORELDREPENGER_FØR_FØDSEL', 'MØDREKVOTE']);
    const dagerBruktAvFar = summerDagerForKontotyper(['FEDREKVOTE']);
    const dagerFellesBrukt = summerDagerForKontotyper(['FELLESPERIODE']);

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

/**
 * Summerer trekkdagar (i heile dagar) for norske uttaksparter og EØS-parter. EØS-delen er avgrensa
 * til tal dagar på kontoen.
 */
const summerDagerForUttak = (
    alleNorgeUttak: NorgeUttak[],
    alleEøsUttak: EøsUttak[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const erFødsel = familiesituasjon === 'fødsel';

    const aktuelleKontotyper = new Set([
        ...alleNorgeUttak.map(({ uttak }) => getUttaksKontoType(uttak)),
        ...alleEøsUttak.map(({ eøs }) => eøs.kontoType),
    ]);

    // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil; sjå
    // finnAntallTidelerÅTrekkeForUttak. Resultatet golvast til heile dagar heilt til slutt.
    let tidelerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const tidelerEøs = Math.min(
            sum(
                alleEøsUttak
                    .filter(({ eøs }) => eøs.kontoType === aktuellKontoType)
                    .map(({ eøs }) => finnAntallTidelerÅTrekkeForEøs(eøs)),
            ),
            gjeldendeKonto.dager * 10,
        );
        const tidelerNorge = sum(
            alleNorgeUttak
                .filter(({ uttak }) => getUttaksKontoType(uttak) === aktuellKontoType)
                .map(({ fom, tom, uttak }) =>
                    finnAntallTidelerÅTrekkeForUttak({ fom, tom }, uttak, erFødsel, familiehendelsedato),
                ),
        );
        tidelerTotalt += tidelerEøs + tidelerNorge;
    }

    return Math.floor(tidelerTotalt / 10);
};

/** Summerer trekkdagar (i heile dagar) mot ein konto, avgrensa til éin forelder sin part av kvar periode. */
export const summerDagerForForelder = (
    perioder: UttakPeriodeDto[],
    forelder: BrukerRolleSak_fpoversikt,
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
): number => {
    const alleNorgeUttak = finnAlleNorgeUttak(perioder).filter(({ uttak }) => uttak.forelder === forelder);
    return summerDagerForUttak(alleNorgeUttak, [], konto, familiesituasjon, familiehendelsedato);
};

export const summerDagerIPerioder = (
    perioder: UttakPeriodeDto[],
    konto: KontoDto[],
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
) =>
    summerDagerForUttak(
        finnAlleNorgeUttak(perioder),
        finnAlleEøsUttak(perioder),
        konto,
        familiesituasjon,
        familiehendelsedato,
    );

const getUttaksKontoType = (uttak: UttakDto): KontoTypeUttak | undefined => {
    if (uttak.kontoType === 'FORELDREPENGER' && uttak.morsAktivitet === 'IKKE_OPPGITT') {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return uttak.kontoType;
};
