import { sum, sumBy } from 'lodash';

import {
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    KontoTypeUttak,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { getAntallUttaksdagerIVinduRundtFødsel } from './periodeUtils';

export const useErAntallDagerOvertrukketIUttaksplan = () => {
    const {
        foreldreInfo: { rettighetType },
        uttakPerioder,
        familiesituasjon,
        valgtStønadskvote,
        familiehendelsedato,
    } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    if (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT') {
        return (
            finnAntallDagerDerKunEnHarForeldrepenger(
                filtrertePerioder,
                familiesituasjon,
                valgtStønadskvote,
                familiehendelsedato,
            ).antallOvertrukketDager > 0
        );
    }

    return (
        tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato)
            .antallOvertrukketDager > 0
    );
};

export const finnAntallDagerDerKunEnHarForeldrepenger = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = valgtStønadskvote.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerIPerioder(
            uttakPerioder.filter((p) => {
                const harMatchendePeriode =
                    erVanligUttakPeriode(p) &&
                    getUttaksKontoType(p) === 'FORELDREPENGER' &&
                    p.morsAktivitet === 'IKKE_OPPGITT';
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = getUttaksKontoType(p) === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    return harMatchendePeriode || harMatchendeKonto;
                }

                // Disse periodene skal kun telles for aktivitetsfri kvoter
                if (harMatchendePeriode) {
                    return false;
                }

                return kontoType === getUttaksKontoType(p);
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

export const useTellDagerIUttaksPeriodene = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato);
};

export const tellDagerIUttaksPeriodene = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    valgtStønadskvote: KontoBeregningDto,
    familiehendelsedato: string,
) => {
    const dagerBruktAvMorFørFødsel = summerDagerIPerioder(
        uttakPerioder.filter((p) => getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL'),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvMor = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL' ||
                getUttaksKontoType(p) === 'MØDREKVOTE' ||
                (erVanligUttakPeriode(p) && p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER'),
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerBruktAvFar = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p) === 'FEDREKVOTE' ||
                (erVanligUttakPeriode(p) && p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'),
        ),
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
    const dagerFellesBrukt = summerDagerIPerioder(
        uttakPerioder.filter(
            (p) =>
                getUttaksKontoType(p) === 'FELLESPERIODE' ||
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
    const ubrukteDagerMor =
        mødreKonto && førFødselKonto
            ? mødreKonto.dager + (barnetErFødt ? dagerBruktAvMorFørFødsel : førFødselKonto.dager) - dagerBruktAvMor
            : 0;
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

            return getUttaksKontoType(p);
        }),
    );

    if (aktuelleKontotyper === undefined) {
        return 0;
    }

    let dagerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto || !aktuellKontoType) {
            continue;
        }

        const dagerEøs = Math.min(
            sum(
                perioder
                    .filter((p) => 'trekkdager' in p && getUttaksKontoType(p) === aktuellKontoType)
                    .map((p) => finnAntallDagerÅTrekke(p, familiesituasjon, familiehendelsedato)),
            ),
            gjeldendeKonto.dager,
        );
        const dagerNorge = sum(
            perioder
                .filter(
                    (p) =>
                        (!('trekkdager' in p) && getUttaksKontoType(p) === aktuellKontoType) ||
                        harOppholdÅrsakLikKontoType(aktuellKontoType, p),
                )
                .map((p) => finnAntallDagerÅTrekke(p, familiesituasjon, familiehendelsedato)),
        );
        dagerTotalt += dagerEøs + dagerNorge;
    }

    return Math.floor(dagerTotalt);
};

export const getUttaksKontoType = (
    p: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): KontoTypeUttak | undefined => {
    if (!('trekkdager' in p) && p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT') {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return p.kontoType;
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

const finnAntallDagerÅTrekke = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiesituasjon: Familiesituasjon,
    familiehendelsedato: string,
) => {
    if (erEøsUttakPeriode(periode)) {
        return periode.trekkdager;
    }

    const arbeidstidprosent = periode.gradering?.arbeidstidprosent;
    const samtidigUttak = periode.samtidigUttak;
    const dager = Uttaksperioden.getAntallUttaksdager(periode);

    if (arbeidstidprosent) {
        const graderingsProsent = (100 - arbeidstidprosent) / 100;
        // Mor sin gradering i tidsrommet 3 uker før / 6 uker etter familiehendelsesdato
        // gir ikkje forlenging av stønadsperioden – dagane skal trekkjast som heile.
        if (familiesituasjon === 'fødsel' && periode.forelder === 'MOR') {
            const dagerIVindu = getAntallUttaksdagerIVinduRundtFødsel(periode.fom, periode.tom, familiehendelsedato);
            const dagerUtenforVindu = dager - dagerIVindu;
            return dagerIVindu + dagerUtenforVindu * graderingsProsent;
        }
        return dager * graderingsProsent;
    }
    if (samtidigUttak) {
        return dager * (samtidigUttak / 100);
    }
    return dager;
};
