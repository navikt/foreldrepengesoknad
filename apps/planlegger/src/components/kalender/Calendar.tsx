import dayjs, { Dayjs } from 'dayjs';
import { FunctionComponent } from 'react';

import { HStack, VStack } from '@navikt/ds-react';

import Day, { DayType, PeriodType } from './Day';
import Month from './Month';

type Period = {
    fom: Dayjs;
    tom: Dayjs;
};

const findPeriodType = (year: number, month: number, day: number, periods: Period[]) => {
    const date = dayjs().year(year).month(month).date(day);

    const fomFirstPeriod = periods[0].fom;
    const tomFirstPeriod = periods[0].tom;
    const tomSecondPeriod = periods[1].tom;
    const fomThirdPeriod = periods[2].fom;
    const tomThirdPeriod = periods[2].tom;

    if (date.isBefore(fomFirstPeriod) || date.isAfter(tomThirdPeriod)) {
        return PeriodType.INGEN;
    }
    if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        return PeriodType.HELGEDAG;
    }
    if (date.isSame(tomFirstPeriod, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isBetween(fomFirstPeriod, tomSecondPeriod)) {
        return PeriodType.FORELDREPENGER_MOR;
    }

    if (date.isBetween(fomThirdPeriod, tomThirdPeriod)) {
        return PeriodType.FORELDREPENGER_FAR;
    }
    return PeriodType.INGEN;
};

const isFirstDay = (date: Dayjs, day: number, periods: Period[]) => {
    return (
        date.isoWeekday() === 5 ||
        date.isoWeekday() === 7 ||
        day === 0 ||
        periods.some((period) => date.startOf('day').isSame(period.fom.startOf('day')))
    );
};

const isLastDay = (date: Dayjs, day: number, periods: Period[]) => {
    return (
        date.isoWeekday() === 6 ||
        date.isoWeekday() === 4 ||
        day === date.daysInMonth() - 1 ||
        periods.some((period) => date.startOf('day').isSame(period.tom.startOf('day')))
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
                                    day={day}
                                    periodType={findPeriodType(monthData.year, monthData.month, day, periods)}
                                    dayType={findDayType(monthData.year, monthData.month, day, periods)}
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
