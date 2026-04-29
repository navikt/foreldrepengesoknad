import dayjs from 'dayjs';

import {
    BrukerRolleSak_fpoversikt,
    KontoBeregningDto,
    KontoDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getAntallUttaksdagerIVinduRundtFødsel } from '@navikt/fp-uttaksplan';
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

const finnAntallDagerÅTrekke = (periode: Periode, erFødsel: boolean, familiehendelsesdato: string): number => {
    if (Uttaksperioden.erEøsPeriode(periode)) {
        return periode.trekkdager;
    }
    const arbeidstidprosent = periode.gradering?.arbeidstidprosent;
    const samtidigUttak = periode.samtidigUttak;
    const dager = Uttaksperioden.getAntallUttaksdager(periode);
    if (arbeidstidprosent) {
        const graderingsProsent = (100 - arbeidstidprosent) / 100;
        // Mor sin gradering i tidsrommet 3 uker før / 6 uker etter familiehendelsesdato
        // gir ikkje forlenging av stønadsperioden – dagane skal trekkjast som heile.
        if (erFødsel && periode.forelder === 'MOR') {
            const dagerIVindu = getAntallUttaksdagerIVinduRundtFødsel(periode.fom, periode.tom, familiehendelsesdato);
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

const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    perioder: Periode[],
    erFødsel: boolean,
    familiehendelsesdato: string,
): KontoDto[] => {
    return tilgjengeligeStønadskontoer.kontoer
        .map((konto) => {
            const perioderForKonto = perioder.filter((p) => p.kontoType === konto.konto);
            const dager = Math.floor(
                perioderForKonto.reduce(
                    (sum, p) => sum + finnAntallDagerÅTrekke(p, erFødsel, familiehendelsesdato),
                    0,
                ),
            );
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
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    perioder: Periode[],
    familiehendelsesdato: string,
    forelder: BrukerRolleSak_fpoversikt,
    erFødsel: boolean,
): ForeldersBrukteDager => {
    const perioderFørTermin = getPerioderFørFamiliehendelse(perioder, familiehendelsesdato);
    const perioderEtterTermin = getPerioderEtterFamiliehendelse(perioder, familiehendelsesdato);
    const førTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskontoer,
        perioderFørTermin,
        erFødsel,
        familiehendelsesdato,
    );
    const etterTermin = beregnBrukteUttaksdager(
        tilgjengeligeStønadskontoer,
        perioderEtterTermin,
        erFødsel,
        familiehendelsesdato,
    );
    const alle = beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioder, erFødsel, familiehendelsesdato);
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
    familiehendelsesdato: string,
    erFødsel: boolean,
): BrukteDager => {
    const perioderMedUttak = (perioder ?? []).filter(filtrerAvslåttePerioderMenBeholdPleiepenger);
    return {
        mor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isMorsPeriode),
            familiehendelsesdato,
            'MOR',
            erFødsel,
        ),
        farMedmor: getBrukteDagerForForelder(
            tilgjengeligeStønadskontoer,
            perioderMedUttak.filter(isFarsPeriode),
            familiehendelsesdato,
            'FAR_MEDMOR',
            erFødsel,
        ),
        alle: beregnBrukteUttaksdager(tilgjengeligeStønadskontoer, perioderMedUttak, erFødsel, familiehendelsesdato),
    };
};
