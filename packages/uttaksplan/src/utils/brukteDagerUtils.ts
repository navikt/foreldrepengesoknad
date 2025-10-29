import { Forelder, Periode, Uttaksperiode, isUttaksperiode } from '@navikt/fp-common';
import { KontoBeregningDto_fpoversikt, KontoDto_fpoversikt } from '@navikt/fp-types';

import { Periodene } from './Periodene';
import { beregnBrukteUttaksdager, getAllePerioderMedUttaksinfoFraUttaksplan } from './uttaksPlanStatus';

interface ForeldersBrukteDager {
    førTermin: KontoDto_fpoversikt[];
    etterTermin: KontoDto_fpoversikt[];
    alle: KontoDto_fpoversikt[];
    dagerTotalt: number;
    dagerEgneKvoter: number;
    dagerAnnenForeldersKvote: number;
    dagerFellesperiode: number;
}

export interface BrukteDager {
    mor: ForeldersBrukteDager;
    farMedmor: ForeldersBrukteDager;
    alle: KontoDto_fpoversikt[];
}

const isMorsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.mor;
};
const isFarsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.farMedmor;
};
const isFellesperiodeKvote = (uttak: KontoDto_fpoversikt): boolean => uttak.konto === 'FELLESPERIODE';

const isMorsKvote = (uttak: KontoDto_fpoversikt): boolean => {
    switch (uttak.konto) {
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return true;
        default:
            return false;
    }
};

const isFarMedmorsKvote = (uttak: KontoDto_fpoversikt): boolean => {
    return uttak.konto === 'FEDREKVOTE';
};

const summerBrukteUttaksdager = (uttak: KontoDto_fpoversikt[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskontoer: KontoBeregningDto_fpoversikt,
    perioder: Uttaksperiode[],
    familiehendelsesdato: Date,
    forelder: Forelder,
): ForeldersBrukteDager => {
    const perioderFørTermin = Periodene(perioder)
        .getPerioderFørFamiliehendelsesdato(familiehendelsesdato)
        .filter(isUttaksperiode);
    const perioderEtterTermin = Periodene(perioder)
        .getPerioderEtterFamiliehendelsesdato(familiehendelsesdato)
        .filter(isUttaksperiode);
    const førTermin = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderFørTermin);
    const etterTermin = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderEtterTermin);
    const alle = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioder);
    const dagerTotalt = summerBrukteUttaksdager(alle);

    const isMor = forelder === Forelder.mor;
    const dagerEgneKvoter = summerBrukteUttaksdager(alle.filter(isMor ? isMorsKvote : isFarMedmorsKvote));
    const dagerOverført = summerBrukteUttaksdager(alle.filter(isMor ? isFarMedmorsKvote : isMorsKvote));
    const dagerFellesperiode = summerBrukteUttaksdager(alle.filter(isFellesperiodeKvote));

    return {
        førTermin,
        etterTermin,
        alle,
        dagerTotalt,
        dagerEgneKvoter,
        dagerFellesperiode,
        dagerAnnenForeldersKvote: dagerOverført,
    };
};

export const getBrukteDager = (
    tilgjengeligeStønadskontoer: KontoBeregningDto_fpoversikt,
    perioder: Periode[],
    familiehendelsesdato: Date,
): BrukteDager => {
    const perioderMedUttak = getAllePerioderMedUttaksinfoFraUttaksplan(perioder);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            Forelder.mor,
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            Forelder.farMedmor,
        ),
        alle: beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioder),
    };
};
