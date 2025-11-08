import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

import { HGrid } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { Period } from '@navikt/fp-types';
import { formatDateIso } from '@navikt/fp-utils';

import { Day } from './Day';
import { Month } from './Month';
import styles from './calendar.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

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

const getMonthKey = (year: number, month: number) => `${year}-${month}`;

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
    const lastDate = useMemo(() => findLastPeriodTom(periods), [periods]);
    const months = useMemo(() => findMonths(periods[0].fom, lastDate), [periods, lastDate]);

    // group periods by month for memoization
    const periodsByMonth = useMemo(() => {
        const result = new Map<string, Period[]>();
        months.forEach(({ year, month }) => {
            const monthStart = dayjs().year(year).month(month).startOf('month');
            const monthEnd = monthStart.endOf('month');
            const relevant = periods.filter(
                (p) => dayjs(p.tom).isAfter(monthStart, 'day') && dayjs(p.fom).isBefore(monthEnd, 'day'),
            );
            result.set(getMonthKey(year, month), relevant);
        });
        return result;
    }, [months, periods]);

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
            <HGrid gap="space-24" columns={{ sm: 1, md: dateClickCallback ? 1 : 2 }}>
                {months.map(({ month, year }) => {
                    const key = getMonthKey(year, month);
                    const monthPeriods = periodsByMonth.get(key) || [];
                    return (
                        <MonthWrapper
                            key={`${year}-${month}`}
                            year={year}
                            month={month}
                            headerLevel={useSmallerWidth ? '5' : '4'}
                            showWeekNumbers={showWeekNumbers}
                            dateTooltipCallback={dateTooltipCallback}
                            dateClickCallback={dateClickCallback}
                            periods={monthPeriods}
                        />
                    );
                })}
            </HGrid>
        </>
    );
};

interface MonthsProps {
    year: number;
    month: number;
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    periods: Period[];
}

const MonthWrapper = React.memo(
    ({ year, month, headerLevel, showWeekNumbers, dateTooltipCallback, dateClickCallback, periods }: MonthsProps) => {
        const periodMap = useMemo(() => buildPeriodMap(periods), [periods]);
        const yearAndMonth = dayjs().year(year).month(month);
        const daysInMonth = yearAndMonth.daysInMonth();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => yearAndMonth.date(i + 1));
        console.log('Rendering Month:', year, month);

        return (
            <Month
                key={`${year}-${month}`}
                year={year}
                month={month}
                headerLevel={headerLevel}
                showWeekNumbers={showWeekNumbers}
            >
                {monthDays.map((date) => (
                    <Day
                        key={`${year}-${month}-${date.date()}`}
                        isoDate={formatDateIso(date)}
                        periodeColor={findDayColor(date, periodMap)}
                        dateTooltipCallback={dateTooltipCallback}
                        dateClickCallback={dateClickCallback && !isWeekend(date) ? dateClickCallback : undefined}
                    />
                ))}
            </Month>
        );
    },
    (prev, next) => {
        // Re-render only if props actually changed
        if (
            prev.year !== next.year ||
            prev.month !== next.month ||
            prev.headerLevel !== next.headerLevel ||
            prev.showWeekNumbers !== next.showWeekNumbers ||
            prev.dateTooltipCallback !== next.dateTooltipCallback ||
            prev.dateClickCallback !== next.dateClickCallback
        ) {
            return false;
        }

        // Shallow compare periods
        if (prev.periods.length !== next.periods.length) return false;
        for (let i = 0; i < prev.periods.length; i++) {
            const a = prev.periods[i];
            const b = next.periods[i];
            if (a.fom !== b.fom || a.tom !== b.tom || a.color !== b.color || a.isSelected !== b.isSelected) {
                return false;
            }
        }
        return true;
    },
);

const findDayColor = (date: Dayjs, periodMap: Map<string, Period>) => {
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
