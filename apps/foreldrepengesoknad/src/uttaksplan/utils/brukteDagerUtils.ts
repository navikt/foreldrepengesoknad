import { beregnBrukteUttaksdager, getAllePerioderMedUttaksinfoFraUttaksplan } from 'uttaksplan/utils/uttaksPlanStatus';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { isUttaksperiode, Periode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { Forelder } from 'app/types/Forelder';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';

interface ForeldersBrukteDager {
    førTermin: StønadskontoUttak[];
    etterTermin: StønadskontoUttak[];
    alle: StønadskontoUttak[];
    dagerTotalt: number;
    dagerEgneKvoter: number;
    dagerAnnenForeldersKvote: number;
    dagerFellesperiode: number;
}

export interface BrukteDager {
    mor: ForeldersBrukteDager;
    farMedmor: ForeldersBrukteDager;
    alle: StønadskontoUttak[];
}

const isMorsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.mor;
};
const isFarsPeriode = (periode: Uttaksperiode): boolean => {
    return periode.forelder === Forelder.farMedmor;
};
const isFellesperiodeKvote = (uttak: StønadskontoUttak): boolean => uttak.konto === StønadskontoType.Fellesperiode;

const isMorsKvote = (uttak: StønadskontoUttak): boolean => {
    switch (uttak.konto) {
        case StønadskontoType.ForeldrepengerFørFødsel:
        case StønadskontoType.Mødrekvote:
            return true;
        default:
            return false;
    }
};

const isFarMedmorsKvote = (uttak: StønadskontoUttak): boolean => {
    return uttak.konto === StønadskontoType.Fedrekvote;
};

const summerBrukteUttaksdager = (uttak: StønadskontoUttak[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    perioder: Uttaksperiode[],
    familiehendelsesdato: Date,
    forelder: Forelder
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
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    perioder: Periode[],
    familiehendelsesdato: Date
): BrukteDager => {
    const perioderMedUttak = getAllePerioderMedUttaksinfoFraUttaksplan(perioder);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            Forelder.mor
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            Forelder.farMedmor
        ),
        alle: beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioder),
    };
};
