import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs, { Dayjs } from 'dayjs';
import { erBarnetIkkeFødt } from 'types/Barnet';

import { HStack, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import Day, { DagIPeriode, PeriodType } from './Day';
import Month from './Month';
import Year from './Year';

const findMonthsOfYear = (year: number, treUkerFørTerminDato: Dayjs, sluttdato49: Dayjs): number[] => {
    if (treUkerFørTerminDato.year() === year) {
        const endOfYear = treUkerFørTerminDato.endOf('year');
        const lastDate = sluttdato49.isBefore(endOfYear) ? sluttdato49 : endOfYear;
        return [...new Array(lastDate.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= treUkerFørTerminDato.month());
    }
    if (sluttdato49.year() === year) {
        const startOfYear = sluttdato49.startOf('year');
        const firstDate = treUkerFørTerminDato.isAfter(startOfYear) ? treUkerFørTerminDato : startOfYear;
        return [...new Array(sluttdato49.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= firstDate.month());
    }
    throw new Error('År er ikke gyldig');
};

type Periode = {
    fom: Dayjs;
    tom: Dayjs;
};

const erFørsteDag = (date: Dayjs, day: number, perioder: Periode[]) => {
    return (
        date.isoWeekday() === 5 ||
        date.isoWeekday() === 7 ||
        day === 0 ||
        perioder.some((periode) => date.startOf('day').isSame(periode.fom.startOf('day')))
    );
};

const erSisteDag = (date: Dayjs, day: number, perioder: Periode[]) => {
    return (
        date.isoWeekday() === 6 ||
        date.isoWeekday() === 4 ||
        day === date.daysInMonth() - 1 ||
        perioder.some((periode) => date.startOf('day').isSame(periode.tom.startOf('day')))
    );
};
const finnStartEllerSlutt = (year: number, month: number, day: number, perioder: Periode[]) => {
    const date = dayjs().year(year).month(month).date(day);
    const førsteDag = erFørsteDag(date, day, perioder);
    const sisteDag = erSisteDag(date, day, perioder);

    if (førsteDag && sisteDag) {
        return DagIPeriode.FØRSTE_OG_SISTE_DAG;
    }
    if (førsteDag) {
        return DagIPeriode.FØRSTE_DAG;
    }
    if (sisteDag) {
        return DagIPeriode.SISTE_DAG;
    }
    return DagIPeriode.DAG_MELLOM;
};

const finnPeriodeType = (
    year: number,
    month: number,
    day: number,
    treUkerFørTerminDato: Dayjs,
    sluttdatoMor: Dayjs,
    sluttdato49: Dayjs,
    termindato: Dayjs,
) => {
    const date = dayjs().year(year).month(month).date(day);

    if (date.isBefore(treUkerFørTerminDato) || date.isAfter(sluttdato49)) {
        return PeriodType.INGEN;
    }
    if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        return PeriodType.HELGEDAG;
    }
    if (date.isSame(termindato, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isBetween(treUkerFørTerminDato, sluttdatoMor)) {
        return PeriodType.FORELDREPENGER_MOR;
    }

    if (date.isBetween(sluttdatoMor, sluttdato49)) {
        return PeriodType.FORELDREPENGER_FAR;
    }
    return PeriodType.INGEN;
};

const Kalender = () => {
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const termindato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined;
    if (!termindato) {
        throw Error('Det er feil i data om barnet');
    }

    const treUkerFørTerminDato = dayjs(termindato).subtract(3, 'weeks').startOf('day');
    const sluttdatoMor = dayjs(treUkerFørTerminDato).add(31, 'weeks');
    const sluttdato49 = dayjs(sluttdatoMor).add(15, 'weeks');

    const perioder = [
        { fom: treUkerFørTerminDato, tom: dayjs(termindato).subtract(1, 'day') },
        { fom: dayjs(termindato).add(1, 'day'), tom: dayjs(sluttdatoMor).subtract(1, 'day') },
        { fom: dayjs(sluttdatoMor), tom: dayjs(sluttdato49).subtract(1, 'day') },
    ];

    const years = [...new Set([treUkerFørTerminDato.year(), sluttdato49.year()])];

    return (
        <VStack gap="5">
            {years.map((year) => (
                <Year key={year} year={year}>
                    <HStack gap="2">
                        {findMonthsOfYear(year, treUkerFørTerminDato, sluttdato49).map((month) => (
                            <Month key={month} year={year} month={month}>
                                {[...Array(dayjs().year(year).month(month).daysInMonth()).keys()].map((day) => (
                                    <Day
                                        key="dag"
                                        day={day}
                                        periodType={finnPeriodeType(
                                            year,
                                            month,
                                            day,
                                            treUkerFørTerminDato,
                                            sluttdatoMor,
                                            sluttdato49,
                                            dayjs(termindato),
                                        )}
                                        startEllerSlutt={finnStartEllerSlutt(year, month, day, perioder)}
                                        isFirstDay={day === 0}
                                        isLastDay={day === dayjs().year(year).month(month).daysInMonth() - 1}
                                    />
                                ))}
                            </Month>
                        ))}
                    </HStack>
                </Year>
            ))}
        </VStack>
    );
};
export default Kalender;
