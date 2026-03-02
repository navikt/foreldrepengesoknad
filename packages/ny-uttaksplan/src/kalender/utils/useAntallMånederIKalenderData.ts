import dayjs from 'dayjs';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksplanperiodeMedKunTapteDager } from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';

export const useAntallMånederIKalenderData = (
    antallMånederLagtTilKalender: number,
    skalViseFørsteMuligeDatoIKalender: boolean,
    barnehagestartdato?: string,
) => {
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();
    const saksperioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const førsteMuligeDato =
        familiesituasjon === 'adopsjon'
            ? familiehendelsedato
            : dayjs(familiehendelsedato).subtract(12, 'weeks').toISOString();

    const sisteMuligeDato = dayjs(familiehendelsedato).add(3, 'year').toISOString();

    const sisteDatoIKalenderFørManueltLagtTil = getSisteDatoIKalender(
        familiehendelsedato,
        saksperioderInkludertTapteDager,
        barnehagestartdato,
    );

    const førsteDatoIKalenderFørManueltLagtTil = getFørsteDatoIKalender(
        familiehendelsedato,
        saksperioderInkludertTapteDager,
    );

    const maksAntallEkstraMånederPåSlutten = monthDiff(
        dayjs(sisteDatoIKalenderFørManueltLagtTil),
        dayjs(sisteMuligeDato),
    );

    return {
        førsteDatoIKalender: skalViseFørsteMuligeDatoIKalender
            ? førsteMuligeDato
            : førsteDatoIKalenderFørManueltLagtTil,
        sisteDatoIKalender: finnSisteDatoIKalenderGittManueltLagtTil(
            sisteDatoIKalenderFørManueltLagtTil,
            antallMånederLagtTilKalender,
            sisteMuligeDato,
        ),
        kanLeggeTilFlereMånederPåStarten:
            !skalViseFørsteMuligeDatoIKalender &&
            familiesituasjon !== 'adopsjon' &&
            monthDiff(dayjs(førsteMuligeDato), dayjs(førsteDatoIKalenderFørManueltLagtTil)) !== 0,
        kanLeggeTilFlereMånederPåSlutten: antallMånederLagtTilKalender < maksAntallEkstraMånederPåSlutten,
    };
};

const getFørsteDatoIKalender = (familiehendelsedato: string, saksperioder: UttaksplanperiodeMedKunTapteDager[]) => {
    const treUkerFørFamiliehendelse = dayjs(familiehendelsedato).subtract(3, 'weeks');
    const førsteFomIUttaksplan = saksperioder.at(0)?.fom;

    return førsteFomIUttaksplan && dayjs(førsteFomIUttaksplan).isBefore(treUkerFørFamiliehendelse)
        ? førsteFomIUttaksplan
        : treUkerFørFamiliehendelse.toISOString();
};

const getSisteDatoIKalender = (
    familiehendelsedato: string,
    saksperioder: UttaksplanperiodeMedKunTapteDager[],
    barnehagestartdato?: string,
) => {
    const sisteTom = saksperioder.at(-1)?.tom;

    if (barnehagestartdato && sisteTom) {
        return dayjs(barnehagestartdato).isSameOrAfter(dayjs(sisteTom)) ? barnehagestartdato : sisteTom;
    }

    return sisteTom ?? finnSeksMånederEtterFamiliehendelse(familiehendelsedato);
};

const finnSisteDatoIKalenderGittManueltLagtTil = (
    sisteDatoIKalenderFørManueltLagtTil: string,
    antallMånederLagtTilKalender: number,
    sisteMuligeDato: string,
): string => {
    if (antallMånederLagtTilKalender === 0) {
        return sisteDatoIKalenderFørManueltLagtTil;
    }

    const nyDato = dayjs(sisteDatoIKalenderFørManueltLagtTil).add(antallMånederLagtTilKalender, 'month');
    const sisteMulige = dayjs(sisteMuligeDato);

    return nyDato.isAfter(sisteMulige) ? sisteMulige.toISOString() : nyDato.toISOString();
};

const finnSeksMånederEtterFamiliehendelse = (familiehendelsedato: string) => {
    return dayjs(familiehendelsedato).add(6, 'month').toISOString();
};

const monthDiff = (d1: dayjs.Dayjs, d2: dayjs.Dayjs): number => {
    let months = (d2.year() - d1.year()) * 12;
    months += d2.month() - d1.month();
    return Math.max(months, 0);
};
