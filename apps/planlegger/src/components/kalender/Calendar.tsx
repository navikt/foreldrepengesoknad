import dayjs, { Dayjs } from 'dayjs';
import { FunctionComponent } from 'react';

import { HStack, VStack } from '@navikt/ds-react';

import Day, { DagIPeriode, PeriodType } from './Day';
import Month from './Month';

type Periode = {
    fom: Dayjs;
    tom: Dayjs;
};

const finnPeriodeType = (
    year: number,
    month: number,
    day: number,
    startdatoSøker1: Date,
    sluttdatoSøker1: Dayjs,
    startdatoSøker2: Dayjs | undefined,
    sluttdatoSøker2: Dayjs,
    termindatoEllerFødselsdato: Dayjs,
) => {
    const date = dayjs().year(year).month(month).date(day);

    if (date.isBefore(startdatoSøker1) || date.isAfter(sluttdatoSøker2)) {
        return PeriodType.INGEN;
    }
    if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        return PeriodType.HELGEDAG;
    }
    if (date.isSame(termindatoEllerFødselsdato, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isBetween(startdatoSøker1, sluttdatoSøker1)) {
        return PeriodType.FORELDREPENGER_MOR;
    }

    if (date.isBetween(startdatoSøker2, sluttdatoSøker2)) {
        return PeriodType.FORELDREPENGER_FAR;
    }
    return PeriodType.INGEN;
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

const findMonths = (firstDate: Dayjs, lastDate: Dayjs): Array<{ month: number; year: number }> => {
    const numberOfMonthsToAddStart = firstDate.month() % 3;
    const numberOfMonthsToAddEnd = (12 - lastDate.month()) % 3;

    const firstDateInCalendar = firstDate.subtract(numberOfMonthsToAddStart, 'month');
    const lastDateInCalendar = lastDate.add(numberOfMonthsToAddEnd, 'month');
    const numberOfMonthsBetween = lastDateInCalendar.diff(firstDateInCalendar, 'month');

    return [...new Array(numberOfMonthsBetween)].map((_, index) => ({
        month: firstDateInCalendar.add(index, 'month').month(),
        year: firstDateInCalendar.add(index, 'month').year(),
    }));
};

interface Props {
    startdatoSøker1: Date;
    startdatoSøker2: Dayjs | undefined;
    sluttdatoSøker1: Dayjs;
    sluttdatoSøker2: Dayjs;
    termindatoEllerFødselsdato: string;
    perioder: Periode[];
}

const Calendar: FunctionComponent<Props> = ({
    startdatoSøker1,
    sluttdatoSøker2,
    sluttdatoSøker1,
    startdatoSøker2,
    termindatoEllerFødselsdato,
    perioder,
}) => {
    const months = findMonths(perioder[0].fom, perioder[perioder.length - 1].tom);

    return (
        <VStack gap="5">
            <HStack gap="10">
                {months.map((monthData, index) => (
                    <Month
                        key={monthData.year + monthData.month}
                        year={monthData.year}
                        month={monthData.month}
                        showYear={index > 0 && months[index - 1].year !== monthData.year}
                    >
                        {[...Array(dayjs().year(monthData.year).month(monthData.month).daysInMonth()).keys()].map(
                            (day) => (
                                <Day
                                    key={monthData.year + monthData.month + day}
                                    day={day - 1}
                                    periodType={finnPeriodeType(
                                        monthData.year,
                                        monthData.month,
                                        day,
                                        startdatoSøker1,
                                        sluttdatoSøker1,
                                        startdatoSøker2,
                                        sluttdatoSøker2,
                                        dayjs(termindatoEllerFødselsdato),
                                    )}
                                    startEllerSlutt={finnStartEllerSlutt(
                                        monthData.year,
                                        monthData.month,
                                        day,
                                        perioder,
                                    )}
                                    isFirstDay={day === 0}
                                    isLastDay={
                                        day === dayjs().year(monthData.year).month(monthData.month).daysInMonth() - 1
                                    }
                                />
                            ),
                        )}
                    </Month>
                ))}
            </HStack>
        </VStack>
    );
};

export default Calendar;
