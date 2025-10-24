import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React from 'react';

import { HGrid, VStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { formatDateIso } from '@navikt/fp-utils';

import { Day } from './Day';
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

const isWeekend = (date: Dayjs) => date.isoWeekday() === 6 || date.isoWeekday() === 7;

const findDayColor = (date: Dayjs, periods: Period[]) => {
    const fomFirstPeriod = periods[0].fom;
    const tomLastPeriod = periods.at(-1)!.tom;

    if (date.isBefore(fomFirstPeriod, 'day') || date.isAfter(tomLastPeriod, 'day')) {
        return isWeekend(date) ? PeriodeColor.GRAY : PeriodeColor.NONE;
    }

    // Kan ha en vanlig periode og en valgt periode på samme dag
    const filteredPeriods = periods.filter((p) => date.isBetween(p.fom, p.tom, 'day', '[]'));
    // Valgt periode skal ha prioritet
    const period = filteredPeriods.find((p) => p.isSelected) || filteredPeriods[0];

    if (period?.color === PeriodeColor.PINK) {
        return PeriodeColor.PINK;
    }

    if (period?.color === PeriodeColor.PURPLE) {
        return PeriodeColor.PURPLE;
    }

    if (isWeekend(date)) {
        return PeriodeColor.GRAY;
    }

    return period?.color ?? PeriodeColor.NONE;
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
    children?: React.ReactNode;
    lastSelectedDate?: string;
}

export const Calendar = ({
    periods,
    useSmallerWidth = false,
    showWeekNumbers = true,
    dateTooltipCallback,
    dateClickCallback,
    children,
    lastSelectedDate,
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
                gap={{ xs: '2', sm: '4', md: '8' }}
                columns={
                    useSmallerWidth
                        ? { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
                        : { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
                }
            >
                {months.map((monthData) => (
                    <VStack gap="space-4" key={monthData.year + '-' + monthData.month}>
                        <Month
                            year={monthData.year}
                            month={monthData.month}
                            headerLevel={useSmallerWidth ? '5' : '4'}
                            showWeekNumbers={showWeekNumbers}
                        >
                            {[
                                ...new Array(dayjs().year(monthData.year).month(monthData.month).daysInMonth()).keys(),
                            ].map((day) => {
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
                                        dateTooltipCallback={
                                            dateTooltipCallback ? () => dateTooltipCallback(isoDate) : undefined
                                        }
                                        dateClickCallback={
                                            dateClickCallback && !isWeekend(date)
                                                ? () => dateClickCallback(isoDate)
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </Month>
                        {children &&
                            dayjs(lastSelectedDate).month() === monthData.month &&
                            dayjs(lastSelectedDate).year() === monthData.year &&
                            children}
                    </VStack>
                ))}
            </HGrid>
        </>
    );
};
