import dayjs from 'dayjs';

import {
    BrukerRolleSak_fpoversikt,
    KontoBeregningDto,
    KontoDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';

type Periode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

interface ForeldersBrukteDager {
    førTermin: KontoDto[];
    etterTermin: KontoDto[];
    alle: KontoDto[];
    dagerTotalt: number;
    dagerEgneKvoter: number;
    dagerAnnenForeldersKvote: number;
    dagerFellesperiode: number;
}

export interface BrukteDager {
    mor: ForeldersBrukteDager;
    farMedmor: ForeldersBrukteDager;
    alle: KontoDto[];
}

const isMorsPeriode = (periode: Periode): boolean => {
    return Uttaksperioden.erIkkeEøsPeriode(periode) && periode.forelder === 'MOR';
};

const isFarsPeriode = (periode: Periode): boolean => {
    return Uttaksperioden.erIkkeEøsPeriode(periode) && periode.forelder === 'FAR_MEDMOR';
};

const isFellesperiodeKvote = (uttak: KontoDto): boolean => uttak.konto === 'FELLESPERIODE';

const isMorsKvote = (uttak: KontoDto): boolean => {
    switch (uttak.konto) {
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return true;
        default:
            return false;
    }
};

const isFarMedmorsKvote = (uttak: KontoDto): boolean => {
    return uttak.konto === 'FEDREKVOTE';
};

const filtrerAvslåttePerioderMenBeholdPleiepenger = (periode: Periode): boolean => {
    if (Uttaksperioden.erEøsPeriode(periode)) {
        return true;
    }
    return periode.resultat?.trekkerDager ?? true;
};

const finnAntallDagerÅTrekke = (periode: Periode): number => {
    if (Uttaksperioden.erEøsPeriode(periode)) {
        return periode.trekkdager;
    }
    const arbeidstidprosent = periode.gradering?.arbeidstidprosent;
    const samtidigUttak = periode.samtidigUttak;
    const dager = Uttaksperioden.getAntallUttaksdager(periode);
    if (arbeidstidprosent) {
        return dager * ((100 - arbeidstidprosent) / 100);
    }
    if (samtidigUttak) {
        return dager * (samtidigUttak / 100);
    }
    return dager;
};

const beregnBrukteUttaksdager = (tilgjengeligeStønadskontoer: KontoBeregningDto, perioder: Periode[]): KontoDto[] => {
    return tilgjengeligeStønadskontoer.kontoer
        .map((konto) => {
            const perioderForKonto = perioder.filter((p) => p.kontoType === konto.konto);
            const dager = Math.floor(perioderForKonto.reduce((sum, p) => sum + finnAntallDagerÅTrekke(p), 0));
            return { konto: konto.konto, dager };
        })
        .filter((k) => k.dager > 0);
};

const getPerioderFørFamiliehendelse = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    return perioder.filter((p) => dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const getPerioderEtterFamiliehendelse = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    return perioder.filter((p) => !dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const summerBrukteUttaksdager = (uttak: KontoDto[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    perioder: Periode[],
    familiehendelsesdato: Date,
    forelder: BrukerRolleSak_fpoversikt,
): ForeldersBrukteDager => {
    const perioderFørTermin = getPerioderFørFamiliehendelse(perioder, familiehendelsesdato);
    const perioderEtterTermin = getPerioderEtterFamiliehendelse(perioder, familiehendelsesdato);
    const førTermin = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderFørTermin);
    const etterTermin = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderEtterTermin);
    const alle = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioder);
    const dagerTotalt = summerBrukteUttaksdager(alle);

    const isMor = forelder === 'MOR';
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
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined,
    familiehendelsesdato: Date,
): BrukteDager => {
    const perioderMedUttak = (perioder ?? []).filter(filtrerAvslåttePerioderMenBeholdPleiepenger);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            'MOR',
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            'FAR_MEDMOR',
        ),
        alle: beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderMedUttak),
    };
};
