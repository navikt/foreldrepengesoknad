import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import { FunctionComponent } from 'react';

import { HGrid } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import Day, { DayType } from './Day';
import Month from './Month';
import styles from './calendar.module.css';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

export type Period = {
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
};

const findDayColor = (year: number, month: number, day: number, periods: Period[]) => {
    const date = dayjs().year(year).month(month).date(day);

    const fomFirstPeriod = periods[0].fom;
    const tomLastPeriod = periods[periods.length - 1].tom;

    if (date.isBefore(fomFirstPeriod, 'day') || date.isAfter(tomLastPeriod, 'day')) {
        return PeriodeColor.NONE;
    }

    const period = periods.find((period) => date.isBetween(period.fom, period.tom, 'day', '[]'));

    if (period?.color === PeriodeColor.PINK) {
        return PeriodeColor.PINK;
    }

    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
        return PeriodeColor.GRAY;
    }

    return period?.color || PeriodeColor.NONE;
};

const isFirstDay = (date: Dayjs, day: number, periods: Period[]) => {
    const pinkPeriod = periods.find((p) => p.color === PeriodeColor.PINK);
    return (
        date.isoWeekday() === 6 ||
        date.isoWeekday() === 1 ||
        day === 1 ||
        periods.some((period) => date.isSame(period.fom, 'day')) ||
        (pinkPeriod && dayjs(pinkPeriod.fom).isSame(date.subtract(1, 'day'), 'day'))
    );
};

const isLastDay = (date: Dayjs, day: number, periods: Period[]) => {
    const pinkPeriod = periods.find((p) => p.color === PeriodeColor.PINK);
    return (
        date.isoWeekday() === 7 ||
        date.isoWeekday() === 5 ||
        day === date.daysInMonth() ||
        periods.some((period) => date.isSame(period.tom, 'day')) ||
        (pinkPeriod && dayjs(pinkPeriod.fom).isSame(date.add(1, 'day'), 'day'))
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

const monthDiff = (d1: Date, d2: Date) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

const findMonths = (firstDate: string, lastDate: string): Array<{ month: number; year: number }> => {
    const numberOfMonthsToAddStart = dayjs(firstDate).month() % 3;
    const numberOfMonthsToAddEnd = 3 - (dayjs(lastDate).month() % 3);

    const firstDateInCalendar = dayjs(firstDate).subtract(numberOfMonthsToAddStart, 'month');
    const lastDateInCalendar = dayjs(lastDate).add(numberOfMonthsToAddEnd, 'month');

    const numberOfMonthsBetween = monthDiff(firstDateInCalendar.toDate(), lastDateInCalendar.toDate());

    return [...new Array(numberOfMonthsBetween)].map((_, index) => ({
        month: firstDateInCalendar.add(index, 'month').month(),
        year: firstDateInCalendar.add(index, 'month').year(),
    }));
};

interface Props {
    periods: Period[];
    useSmallerWidth?: boolean;
}

const Calendar: FunctionComponent<Props> = ({ periods, useSmallerWidth = false }) => {
    const months = findMonths(periods[0].fom, periods[periods.length - 1].tom);
    return (
        <>
            {periods.some((period) => period.srText) && (
                <div className={styles.srOnly}>
                    {periods
                        .filter((periode) => periode.srText)
                        .map((period) => period.srText)
                        .toString()}
                </div>
            )}
            <HGrid
                gap={{ xs: '2', sm: '4', md: '8' }}
                className={useSmallerWidth ? styles.gridColumnsSmall : styles.gridColumnsWide}
            >
                {months.map((monthData, index) => (
                    <Month
                        key={monthData.year + '-' + monthData.month}
                        year={monthData.year}
                        month={monthData.month}
                        showYear={index > 0 && months[index - 1].year !== monthData.year}
                        headerLevel={useSmallerWidth ? '5' : '4'}
                    >
                        {[...Array(dayjs().year(monthData.year).month(monthData.month).daysInMonth()).keys()].map(
                            (day) => (
                                <Day
                                    key={monthData.year + monthData.month + day}
                                    day={day + 1}
                                    periodeColor={findDayColor(monthData.year, monthData.month, day + 1, periods)}
                                    dayType={findDayType(monthData.year, monthData.month, day + 1, periods)}
                                />
                            ),
                        )}
                    </Month>
                ))}
            </HGrid>
        </>
    );
};

export default Calendar;
