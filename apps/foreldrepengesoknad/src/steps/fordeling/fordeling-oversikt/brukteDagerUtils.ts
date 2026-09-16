import dayjs from 'dayjs';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    KontoDto,
    PeriodeDto_fpoversikt,
} from '@navikt/fp-types';
import {
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    summerDagerIPerioder,
} from '@navikt/fp-uttaksplan/periode-utils';

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

const summerBrukteUttaksdager = (uttak: KontoDto[]) => {
    return uttak.reduce((dager, u) => dager + u.dager, 0);
};

/** Summerer trekkdagar per konto (uavhengig av kven som har uttak). */
const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: PeriodeDto_fpoversikt[],
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

/**
 * Behold kun den sida (søker/annenPart) av perioden som gjeld den aktuelle forelderen. EØS-sida
 * blir alltid fjerna her, sidan ho aldri representerer den norske forelderen sine eigne dagar.
 */
const taKunSideForForelder = (
    periode: PeriodeDto_fpoversikt,
    forelder: BrukerRolleSak_fpoversikt,
): PeriodeDto_fpoversikt => ({
    fom: periode.fom,
    tom: periode.tom,
    søker: periode.søker?.forelder === forelder ? periode.søker : undefined,
    annenPart: periode.annenPart?.forelder === forelder ? periode.annenPart : undefined,
});

/** Summerer trekkdagar per konto, avgrensa til éin forelder si eiga side av kvar periode. */
const beregnBrukteUttaksdagerForForelder = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: PeriodeDto_fpoversikt[],
    forelder: BrukerRolleSak_fpoversikt,
    familiesituasjon: Familiesituasjon,
    familiehendelsesdato: string,
): KontoDto[] => {
    const perioderForForelder = perioder.map((p) => taKunSideForForelder(p, forelder));
    return tilgjengeligeStønadskvoter.kontoer
        .map((konto) => {
            const dager = summerDagerIPerioder(perioderForForelder, [konto], familiesituasjon, familiehendelsesdato);
            return { konto: konto.konto, dager };
        })
        .filter((k) => k.dager > 0);
};

const getPerioderFørFamiliehendelse = (
    perioder: PeriodeDto_fpoversikt[],
    familiehendelsesdato: string,
): PeriodeDto_fpoversikt[] => {
    return perioder.filter((p) => dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const getPerioderEtterFamiliehendelse = (
    perioder: PeriodeDto_fpoversikt[],
    familiehendelsesdato: string,
): PeriodeDto_fpoversikt[] => {
    return perioder.filter((p) => !dayjs(p.tom).isBefore(familiehendelsesdato, 'day'));
};

const getBrukteDagerForForelder = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: PeriodeDto_fpoversikt[],
    familiehendelsesdato: string,
    forelder: BrukerRolleSak_fpoversikt,
    familiesituasjon: Familiesituasjon,
): ForeldersBrukteDager => {
    const perioderFørTermin = getPerioderFørFamiliehendelse(perioder, familiehendelsesdato);
    const perioderEtterTermin = getPerioderEtterFamiliehendelse(perioder, familiehendelsesdato);
    const førTermin = beregnBrukteUttaksdagerForForelder(
        tilgjengeligeStønadskvoter,
        perioderFørTermin,
        forelder,
        familiesituasjon,
        familiehendelsesdato,
    );
    const etterTermin = beregnBrukteUttaksdagerForForelder(
        tilgjengeligeStønadskvoter,
        perioderEtterTermin,
        forelder,
        familiesituasjon,
        familiehendelsesdato,
    );
    const alle = beregnBrukteUttaksdagerForForelder(
        tilgjengeligeStønadskvoter,
        perioder,
        forelder,
        familiesituasjon,
        familiehendelsesdato,
    );
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
    perioder: PeriodeDto_fpoversikt[] | undefined,
    familiehendelsesdato: string,
    familiesituasjon: Familiesituasjon,
): BrukteDager => {
    const perioderMedUttak = (perioder ?? []).map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak,
            familiehendelsesdato,
            'MOR',
            familiesituasjon,
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak,
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
