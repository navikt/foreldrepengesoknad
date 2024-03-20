import dayjs, { Dayjs } from 'dayjs';
import { FunctionComponent } from 'react';

import { HStack, VStack } from '@navikt/ds-react';

import Day, { DayType, PeriodType } from './Day';
import Month from './Month';

export type Period = {
    fom: Dayjs;
    tom: Dayjs;
    type: 'førTermin' | 'familiehendelse' | 'aktivitetskrav' | 'utenAktivitetskrav' | 'mor' | 'far';
};

const findPeriodType = (year: number, month: number, day: number, periods: Period[]) => {
    const date = dayjs().year(year).month(month).date(day);

    const fomFørstePeriode = periods[0].fom;
    const tomSistePeriode = periods[periods.length - 1].tom;
    const familiehendelse = periods.find((p) => p.type === 'familiehendelse')?.fom;
    const morEllerAktivitetfriPeriode = periods.find((p) => p.type === 'mor' || p.type === 'utenAktivitetskrav');
    const førTermin = periods.find((p) => p.type === 'førTermin');

    const farsPeriode = periods.find((p) => p.type === 'far' || p.type === 'aktivitetskrav');

    if (date.isBefore(fomFørstePeriode, 'day') || date.isAfter(tomSistePeriode, 'day')) {
        return PeriodType.INGEN;
    }

    if (familiehendelse && date.isSame(familiehendelse, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
        return PeriodType.HELGEDAG;
    }

    if (
        morEllerAktivitetfriPeriode &&
        date.isBetween(morEllerAktivitetfriPeriode.fom, morEllerAktivitetfriPeriode.tom, 'day', '[]')
    ) {
        return PeriodType.FORELDREPENGER_MOR_ELLER_AKTIVITETSFRI;
    }
    if (førTermin && date.isBetween(førTermin.fom, førTermin.tom, 'day', '[]')) {
        return PeriodType.FORELDREPENGER_MOR_ELLER_AKTIVITETSFRI;
    }

    if (farsPeriode && date.isBetween(farsPeriode.fom, farsPeriode.tom, 'day', '[]')) {
        return PeriodType.FORELDREPENGER_FAR;
    }

    return PeriodType.INGEN;
};

const isFirstDay = (date: Dayjs, day: number, periods: Period[]) => {
    return (
        date.isoWeekday() === 6 ||
        date.isoWeekday() === 1 ||
        day === 1 ||
        periods.some((period) => date.isSame(period.fom, 'day'))
    );
};

const isLastDay = (date: Dayjs, day: number, periods: Period[]) => {
    return (
        date.isoWeekday() === 7 ||
        date.isoWeekday() === 5 ||
        day === date.daysInMonth() ||
        periods.some((period) => date.isSame(period.tom, 'day'))
    );
};

const findDayType = (year: number, month: number, day: number, periods: Period[]) => {
    const date = dayjs().year(year).month(month).date(day);
    const firstDay = isFirstDay(date, day, periods);
    const lastDay = isLastDay(date, day, periods);

    if (firstDay && lastDay) {
        return DayType.FIRST_AND_LAST_DAY;
    }
    if (firstDay) {
        return DayType.FIRST_DAY;
    }
    if (lastDay) {
        return DayType.LAST_DAY;
    }
    return DayType.BETWEEN_DAY;
};

//TODO Prøv å bruk Dayjs.diff i staden for (Eg fekk feil resultat da eg testa)
const monthDiff = (d1: Date, d2: Date) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

const findMonths = (firstDate: Dayjs, lastDate: Dayjs): Array<{ month: number; year: number }> => {
    const numberOfMonthsToAddStart = firstDate.month() % 3;
    const numberOfMonthsToAddEnd = 3 - (lastDate.month() % 3);

    const firstDateInCalendar = firstDate.subtract(numberOfMonthsToAddStart, 'month');
    const lastDateInCalendar = lastDate.add(numberOfMonthsToAddEnd, 'month');

    const numberOfMonthsBetween = monthDiff(firstDateInCalendar.toDate(), lastDateInCalendar.toDate());

    return [...new Array(numberOfMonthsBetween)].map((_, index) => ({
        month: firstDateInCalendar.add(index, 'month').month(),
        year: firstDateInCalendar.add(index, 'month').year(),
    }));
};

interface Props {
    periods: Period[];
}

const Calendar: FunctionComponent<Props> = ({ periods }) => {
    const months = findMonths(periods[0].fom, periods[periods.length - 1].tom);

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
                                    day={day + 1}
                                    periodType={findPeriodType(monthData.year, monthData.month, day + 1, periods)}
                                    dayType={findDayType(monthData.year, monthData.month, day + 1, periods)}
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
