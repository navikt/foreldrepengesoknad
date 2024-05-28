import {
    Forelder,
    Periode,
    Periodene,
    StønadskontoType,
    Uttaksperiode,
    beregnBrukteUttaksdager,
    getAllePerioderMedUttaksinfoFraUttaksplan,
    isUttaksperiode,
} from '@navikt/fp-common';
import { Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

interface ForeldersBrukteDager {
    førTermin: Stønadskonto[];
    etterTermin: Stønadskonto[];
    alle: Stønadskonto[];
    dagerTotalt: number;
    dagerEgneKvoter: number;
    dagerAnnenForeldersKvote: number;
    dagerFellesperiode: number;
}

export interface BrukteDager {
    mor: ForeldersBrukteDager;
    farMedmor: ForeldersBrukteDager;
    alle: Stønadskonto[];
}

const isMorsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.mor;
};
const isFarsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.farMedmor;
};
const isFellesperiodeKvote = (uttak: Stønadskonto): boolean => uttak.konto === StønadskontoType.Fellesperiode;

const isMorsKvote = (uttak: Stønadskonto): boolean => {
    switch (uttak.konto) {
        case StønadskontoType.ForeldrepengerFørFødsel:
        case StønadskontoType.Mødrekvote:
            return true;
        default:
            return false;
    }
};

const isFarMedmorsKvote = (uttak: Stønadskonto): boolean => {
    return uttak.konto === StønadskontoType.Fedrekvote;
};

const summerBrukteUttaksdager = (uttak: Stønadskonto[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
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
    tilgjengeligeStønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
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
