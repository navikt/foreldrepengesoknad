import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useCallback, useMemo, useState } from 'react';

import { HGrid } from '@navikt/ds-react';

import { Month } from './Month';
import styles from './calendar.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

interface Props {
    periods: CalendarPeriod[];
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
    const allMonths = useMemo(() => findMonths(periods[0].fom, findLatestTom(periods)), [periods]);
    const periodsByMonth = useMemo(() => getPeriodsByMonth(allMonths, periods), [allMonths, periods]);

    const [focusedDate, setFocusedDate] = useState<dayjs.Dayjs | undefined>();

    // 👇 Move focus with arrow keys
    const handleKeyNavigation = useCallback(
        (e: React.KeyboardEvent) => {
            if (!focusedDate) return;
            let nextDate = focusedDate;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    nextDate = focusedDate.subtract(1, 'day');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextDate = focusedDate.add(1, 'day');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    nextDate = focusedDate.subtract(7, 'day');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    nextDate = focusedDate.add(7, 'day');
                    break;
                default:
                    return;
            }

            setFocusedDate(nextDate);
        },
        [focusedDate],
    );

    return (
        <div onKeyDown={handleKeyNavigation}>
            {periods.some((p) => p.srText) && (
                <div className={styles.srOnly}>
                    {periods
                        .filter((p) => p.srText)
                        .map((p) => p.srText)
                        .toString()}
                </div>
            )}
            <HGrid gap="space-24" columns={{ sm: 1, md: dateClickCallback ? 1 : 2 }}>
                {allMonths.map(({ month, year }, index) => {
                    const monthPeriods = periodsByMonth.get(getMonthKey(year, month)) ?? [];
                    const isMonthInFocus = focusedDate?.year() === year && focusedDate?.month() === month;
                    return (
                        <Month
                            key={`${year}-${month}`}
                            isFirstMonth={index === 0}
                            year={year}
                            month={month}
                            periods={monthPeriods}
                            headerLevel={useSmallerWidth ? '5' : '4'}
                            showWeekNumbers={showWeekNumbers}
                            dateTooltipCallback={dateTooltipCallback}
                            dateClickCallback={dateClickCallback}
                            focusedDate={isMonthInFocus ? focusedDate : undefined}
                            setFocusedDate={setFocusedDate}
                        />
                    );
                })}
            </HGrid>
        </div>
    );
};

const findLatestTom = (periods: CalendarPeriod[]): string =>
    periods.reduce((last, p) => (dayjs(p.tom).isAfter(dayjs(last)) ? p.tom : last), periods[0].tom);

const findMonths = (firstDate: string, lastDate: string): Array<{ month: number; year: number }> => {
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

const monthDiff = (d1: Date, d2: Date): number => {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth() - d1.getMonth();
    return Math.max(months, 0);
};

const getMonthKey = (year: number, month: number): string => `${year}-${month}`;

const getPeriodsByMonth = (
    months: Array<{ month: number; year: number }>,
    periods: CalendarPeriod[],
): Map<string, CalendarPeriod[]> => {
    const result = new Map<string, CalendarPeriod[]>();
    months.forEach(({ year, month }) => {
        const monthStart = dayjs().year(year).month(month).startOf('month');
        const monthEnd = monthStart.endOf('month');
        const periodsForMonth = periods.filter(
            (p) => dayjs(p.tom).isSameOrAfter(monthStart, 'day') && dayjs(p.fom).isSameOrBefore(monthEnd, 'day'),
        );
        result.set(getMonthKey(year, month), periodsForMonth);
    });
    return result;
};
