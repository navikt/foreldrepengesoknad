import dayjs from 'dayjs';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';

export const useAntallMånederIKalenderData = (antallMånederLagtTilKalender: number, barnehagestartdato?: string) => {
    const { familiehendelsedato, uttaksplan, familiesituasjon } = useUttaksplanData();

    const førsteDatoIKalender =
        familiesituasjon === 'adopsjon'
            ? familiehendelsedato
            : dayjs(familiehendelsedato).subtract(12, 'weeks').toISOString();

    const sisteDatoIKalenderFørManueltLagtTil = getSisteDatoIKalender(
        familiehendelsedato,
        uttaksplan,
        barnehagestartdato,
    );

    const sisteMuligeDato = dayjs(familiehendelsedato).add(3, 'year').toISOString();

    return {
        førsteDatoIKalender,
        sisteDatoIKalender: finnSisteDatoIKalender(
            sisteDatoIKalenderFørManueltLagtTil,
            antallMånederLagtTilKalender,
            sisteMuligeDato,
        ),
        maksAntallEkstraMåneder: monthDiff(dayjs(sisteDatoIKalenderFørManueltLagtTil), dayjs(sisteMuligeDato)),
    };
};

const finnSisteDatoIKalender = (
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

const getSisteDatoIKalender = (familiehendelsedato: string, uttaksplan: Planperiode[], barnehagestartdato?: string) => {
    const sisteTom = uttaksplan.at(-1)?.tom;

    if (barnehagestartdato && sisteTom) {
        return dayjs(barnehagestartdato).isSameOrAfter(dayjs(sisteTom)) ? barnehagestartdato : sisteTom;
    }

    return sisteTom ?? finnSeksMånederEtterFamiliehendelse(familiehendelsedato);
};

const finnSeksMånederEtterFamiliehendelse = (familiehendelsedato: string) => {
    return dayjs(familiehendelsedato).add(6, 'month').toISOString();
};

const monthDiff = (d1: dayjs.Dayjs, d2: dayjs.Dayjs): number => {
    let months = (d2.year() - d1.year()) * 12;
    months += d2.month() - d1.month();
    return Math.max(months, 0);
};
