import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React from 'react';

import { HGrid } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { formatDateIso } from '@navikt/fp-utils';

import { Day, DayType } from './Day';
import { Month } from './Month';
import styles from './calendar.module.css';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

export type Period = {
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
    isSelected?: boolean;
};

const findDayColor = (date: Dayjs, periods: Period[]) => {
    const fomFirstPeriod = periods[0].fom;
    const tomLastPeriod = periods.at(-1)!.tom;

    if (date.isBefore(fomFirstPeriod, 'day') || date.isAfter(tomLastPeriod, 'day')) {
        return PeriodeColor.NONE;
    }

    const period = periods.find((p) => date.isBetween(p.fom, p.tom, 'day', '[]'));

    if (period?.color === PeriodeColor.PINK) {
        return PeriodeColor.PINK;
    }

    if (period?.color === PeriodeColor.PURPLE) {
        return PeriodeColor.PURPLE;
    }

    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
        return PeriodeColor.GRAY;
    }

    return period?.color ?? PeriodeColor.NONE;
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

const findDayType = (date: Dayjs, day: number, periods: Period[]) => {
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
    return Math.max(months, 0);
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
    showWeekNumbers?: boolean;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
}

export const Calendar = ({
    periods,
    useSmallerWidth = false,
    showWeekNumbers = true,
    dateTooltipCallback,
    dateClickCallback,
}: Props) => {
    const months = findMonths(periods[0].fom, periods.at(-1)!.tom);

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
                columns={
                    useSmallerWidth
                        ? { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }
                        : { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }
                }
            >
                {months.map((monthData, index) => (
                    <Month
                        key={monthData.year + '-' + monthData.month}
                        year={monthData.year}
                        month={monthData.month}
                        showYear={index > 0 && months[index - 1].year !== monthData.year}
                        headerLevel={useSmallerWidth ? '5' : '4'}
                        showWeekNumbers={showWeekNumbers}
                    >
                        {[...new Array(dayjs().year(monthData.year).month(monthData.month).daysInMonth()).keys()].map(
                            (day) => {
                                const date = dayjs()
                                    .year(monthData.year)
                                    .month(monthData.month)
                                    .date(day + 1);
                                const isoDate = formatDateIso(date);

                                return (
                                    <Day
                                        key={monthData.year + monthData.month + day}
                                        day={day + 1}
                                        periodeColor={findDayColor(date, periods)}
                                        dayType={findDayType(date, day + 1, periods)}
                                        isSelected={
                                            periods.find((p) => date.isBetween(p.fom, p.tom, 'day', '[]'))
                                                ?.isSelected || false
                                        }
                                        dateTooltipCallback={
                                            dateTooltipCallback ? () => dateTooltipCallback(isoDate) : undefined
                                        }
                                        dateClickCallback={
                                            dateClickCallback ? () => dateClickCallback(isoDate) : undefined
                                        }
                                    />
                                );
                            },
                        )}
                    </Month>
                ))}
            </HGrid>
        </>
    );
};
