import dayjs from 'dayjs';

import {
    BrukerRolleSak_fpoversikt,
    KontoBeregningDto,
    KontoDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { finnAntallTidelerÅTrekke } from '@navikt/fp-uttaksplan';

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

const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskvoter: KontoBeregningDto,
    perioder: Periode[],
    erFødsel: boolean,
    familiehendelsesdato: string,
): KontoDto[] => {
    return tilgjengeligeStønadskvoter.kontoer
        .map((konto) => {
            const perioderForKonto = perioder.filter((p) => p.kontoType === konto.konto);
            // Trekkdagar summerast i tideler (heiltal) for å unngå flyttalsfeil, og
            // golvast til heile dagar heilt til slutt – sjå finnAntallTidelerÅTrekke.
            const tideler = perioderForKonto.reduce(
                (sum, p) => sum + finnAntallTidelerÅTrekke(p, erFødsel, familiehendelsesdato),
                0,
            );
            return { konto: konto.konto, dager: Math.floor(tideler / 10) };
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
    erFødsel: boolean,
): ForeldersBrukteDager => {
    const perioderFørTermin = getPerioderFørFamiliehendelse(perioder, familiehendelsesdato);
    const perioderEtterTermin = getPerioderEtterFamiliehendelse(perioder, familiehendelsesdato);
    const førTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskvoter,
        perioderFørTermin,
        erFødsel,
        familiehendelsesdato,
    );
    const etterTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskvoter,
        perioderEtterTermin,
        erFødsel,
        familiehendelsesdato,
    );
    const alle = beregnBrukteUttaksdager(tilgjengeligeStønadskvoter, perioder, erFødsel, familiehendelsesdato);
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
    erFødsel: boolean,
): BrukteDager => {
    const perioderMedUttak = (perioder ?? []).filter(filtrerAvslåttePerioderMenBeholdPleiepenger);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            'MOR',
            erFødsel,
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskvoter,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            'FAR_MEDMOR',
            erFødsel,
        ),
        alle: beregnBrukteUttaksdager(tilgjengeligeStønadskvoter, perioderMedUttak, erFødsel, familiehendelsesdato),
    };
};
