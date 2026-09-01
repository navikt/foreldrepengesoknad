import dayjs from 'dayjs';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import {
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    summerDagerIPerioder,
} from '@navikt/fp-uttaksplan/periode-utils';

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

interface BrukteDager {
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
        case 'MØDREKVOTE': {
            return true;
        }
        default: {
            return false;
        }
    }
};

const isFarMedmorsKvote = (uttak: KontoDto): boolean => {
    return uttak.konto === 'FEDREKVOTE';
};

const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: Periode[],
    familiesituasjon: Familiesituasjon,
    familiehendelsesdato: string,
): KontoDto[] => {
    return tilgjengeligeStønadskvoter.kontoer
        .map((konto) => {
            const dager = summerDagerIPerioder(perioder, [konto], familiesituasjon, familiehendelsesdato);
            return { konto: konto.konto, dager };
        })
        .filter((k) => k.dager > 0);
};

const getPerioderFørFamiliehendelse = (perioder: Periode[], familiehendelsesdato: string): Periode[] => {
    return perioder.filter((p) => dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const getPerioderEtterFamiliehendelse = (perioder: Periode[], familiehendelsesdato: string): Periode[] => {
    return perioder.filter((p) => !dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const summerBrukteUttaksdager = (uttak: KontoDto[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: Periode[],
    familiehendelsesdato: string,
    forelder: BrukerRolleSak_fpoversikt,
    familiesituasjon: Familiesituasjon,
): ForeldersBrukteDager => {
    const perioderFørTermin = getPerioderFørFamiliehendelse(perioder, familiehendelsesdato);
    const perioderEtterTermin = getPerioderEtterFamiliehendelse(perioder, familiehendelsesdato);
    const førTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskvoter,
        perioderFørTermin,
        familiesituasjon,
        familiehendelsesdato,
    );
    const etterTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskvoter,
        perioderEtterTermin,
        familiesituasjon,
        familiehendelsesdato,
    );
    const alle = beregnBrukteUttaksdager(tilgjengeligeStønadskvoter, perioder, familiesituasjon, familiehendelsesdato);
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
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined,
    familiehendelsesdato: string,
    familiesituasjon: Familiesituasjon,
): BrukteDager => {
    const perioderMedUttak = (perioder ?? []).filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            'MOR',
            familiesituasjon,
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            'FAR_MEDMOR',
            familiesituasjon,
        ),
        alle: beregnBrukteUttaksdager(
            tilgjengeligeStønadskvoter,
            perioderMedUttak,
            familiesituasjon,
            familiehendelsesdato,
        ),
    };
};
