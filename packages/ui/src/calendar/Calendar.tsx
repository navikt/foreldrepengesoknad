import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

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

const buildPeriodMap = (periods: Period[]) => {
    const map = new Map<string, Period>();
    periods.forEach((p) => {
        let current = dayjs(p.fom);
        const end = dayjs(p.tom);
        while (!current.isAfter(end, 'day')) {
            const iso = current.format('YYYY-MM-DD');
            if (!map.has(iso) || p.isSelected) {
                map.set(iso, p);
            }
            current = current.add(1, 'day');
        }
    });
    return map;
};

const findLastPeriodTom = (periods: Period[]): string =>
    periods.reduce((last, p) => (dayjs(p.tom).isAfter(dayjs(last)) ? p.tom : last), periods[0].tom);

const monthDiff = (d1: Date, d2: Date) => {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth() - d1.getMonth();
    return Math.max(months, 0);
};

const findMonths = (firstDate: string, lastDate: string) => {
    const first = dayjs(firstDate);
    const last = dayjs(lastDate);
    const numberOfMonthsToAddStart = first.month() % 3;
    const numberOfMonthsToAddEnd = 3 - (last.month() % 3);

    const firstDateInCalendar = first.subtract(numberOfMonthsToAddStart, 'month');
    const lastDateInCalendar = last.add(numberOfMonthsToAddEnd, 'month');

    const numberOfMonthsBetween = monthDiff(firstDateInCalendar.toDate(), lastDateInCalendar.toDate());

    return Array.from({ length: numberOfMonthsBetween }, (_, i) => {
        const date = firstDateInCalendar.add(i, 'month');
        return { month: date.month(), year: date.year() };
    });
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
    const periodMap = useMemo(() => buildPeriodMap(periods), [periods]);
    const lastDate = useMemo(() => findLastPeriodTom(periods), [periods]);
    const months = useMemo(() => findMonths(periods[0].fom, lastDate), [periods, lastDate]);

    const findDayColor = (date: Dayjs) => {
        const iso = date.format('YYYY-MM-DD');
        const period = periodMap.get(iso);

        if (!period) {
            return isWeekend(date) ? PeriodeColor.GRAY : PeriodeColor.NONE;
        }
        if (period.color === PeriodeColor.PINK) {
            return PeriodeColor.PINK;
        }
        if (period.color === PeriodeColor.PURPLE) {
            return PeriodeColor.PURPLE;
        }
        return isWeekend(date) ? PeriodeColor.GRAY : period.color;
    };

    return (
        <>
            {periods.some((p) => p.srText) && (
                <div className={styles.srOnly}>
                    {periods
                        .filter((p) => p.srText)
                        .map((p) => p.srText)
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
                {months.map(({ month, year }) => {
                    const yearAndMonth = dayjs().year(year).month(month);
                    const daysInMonth = yearAndMonth.daysInMonth();
                    const monthDays = Array.from({ length: daysInMonth }, (_, i) => yearAndMonth.date(i + 1));

                    return (
                        <VStack gap="space-4" key={`${year}-${month}`}>
                            <Month
                                year={year}
                                month={month}
                                headerLevel={useSmallerWidth ? '5' : '4'}
                                showWeekNumbers={showWeekNumbers}
                            >
                                {monthDays.map((date) => {
                                    const isoDate = formatDateIso(date);
                                    return (
                                        <Day
                                            key={isoDate}
                                            day={date.date()}
                                            periodeColor={findDayColor(date)}
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
                                lastSelectedDate &&
                                dayjs(lastSelectedDate).month() === month &&
                                dayjs(lastSelectedDate).year() === year &&
                                children}
                        </VStack>
                    );
                })}
            </HGrid>
        </>
    );
};
