import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

import { Box, HGrid, Heading, VStack } from '@navikt/ds-react';

import { formatDateIso } from '@navikt/fp-utils';

import { Day } from './Day';
import styles from './month.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

dayjs.extend(isoWeek);

interface MonthsProps {
    year: number;
    month: number;
    isFirstMonth: boolean;
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    periods: CalendarPeriod[];
    focusedDate: Dayjs | undefined;
    setFocusedDate: (date: Dayjs) => void;
}

export const Month = React.memo(
    ({
        year,
        month,
        isFirstMonth,
        headerLevel,
        showWeekNumbers,
        dateTooltipCallback,
        dateClickCallback,
        periods,
        focusedDate,
        setFocusedDate,
    }: MonthsProps) => {
        const periodMap = useMemo(() => buildPeriodMap(periods), [periods]);
        const yearAndMonth = dayjs().year(year).month(month);
        const daysInMonth = yearAndMonth.daysInMonth();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => yearAndMonth.date(i + 1));
        console.log('Rendering Month:', year, month);

        return (
            <Month1
                key={`${year}-${month}`}
                year={year}
                month={month}
                headerLevel={headerLevel}
                showWeekNumbers={showWeekNumbers}
            >
                {monthDays.map((date, index) => (
                    <Day
                        key={`${year}-${month}-${date.date()}`}
                        isoDate={formatDateIso(date)}
                        periodeColor={findDayColor(date, periodMap)}
                        dateTooltipCallback={dateTooltipCallback}
                        dateClickCallback={dateClickCallback && !isWeekend(date) ? dateClickCallback : undefined}
                        isFocused={focusedDate?.isSame(date, 'day') ?? (isFirstMonth && index === 0) ?? false}
                        setFocusedDate={setFocusedDate}
                    />
                ))}
            </Month1>
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
            prev.dateClickCallback !== next.dateClickCallback ||
            prev.focusedDate !== next.focusedDate ||
            prev.setFocusedDate !== next.setFocusedDate
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

type Props = {
    year: number;
    month: number;
    children: React.ReactNode[];
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
    periods: CalendarPeriod[];
    focusedDate: Dayjs | undefined;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    setFocusedDate: (date: Dayjs) => void;
};

const Month1 = ({ year, month, children, headerLevel, showWeekNumbers }: Props) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');
    const startWeekDay = monthDate.isoWeekday();
    const endWeekDay = monthDate.endOf('month').isoWeekday();
    const daysInMonth = monthDate.daysInMonth();
    const firstWeekNrOfMonth = monthDate.isoWeek();
    const nrOfWeeks = Math.ceil((daysInMonth + (startWeekDay - 1) + (7 - endWeekDay)) / 7);

    const nrOfColumns = showWeekNumbers ? 8 : 7;

    // Precompute weekday headers
    const weekdayHeaders = Array.from({ length: 7 }, (_, i) => monthDate.isoWeekday(i + 1).format('dd'));

    // Precompute all week rows
    const weeks = useMemo(() => {
        const weekRows: React.ReactNode[][] = [];
        let childIndex = 0;

        for (let week = 0; week < nrOfWeeks; week++) {
            const row: React.ReactNode[] = [];
            if (showWeekNumbers) {
                row.push(
                    <div key={`weeknr-${week}`} className={styles.weeknr}>
                        {firstWeekNrOfMonth + week}
                    </div>,
                );
            }

            for (let day = 0; day < 7; day++) {
                const cellIndex = week * 7 + day;
                const isBeforeMonth = week === 0 && day < startWeekDay - 1;
                const isAfterMonth = week === nrOfWeeks - 1 && day >= 7 - (7 - endWeekDay);

                if (isBeforeMonth || isAfterMonth) {
                    row.push(<div key={`empty-${cellIndex}`} />);
                } else {
                    row.push(children[childIndex++] || <div key={`empty-${cellIndex}`} />);
                }
            }

            weekRows.push(row);
        }

        return weekRows;
    }, [children, nrOfWeeks, showWeekNumbers, startWeekDay, endWeekDay, firstWeekNrOfMonth]);

    return (
        <Box.New
            borderWidth="1"
            width="300px"
            padding="5"
            borderRadius="4"
            borderColor="neutral-subtle"
            data-testid={`year:${year};month:${month}`}
        >
            <VStack gap="space-12">
                <Heading size="small" level={headerLevel} align="center">
                    {`${monthDate.format('MMMM')} ${year}`}
                </Heading>

                <div>
                    <HGrid columns={nrOfColumns}>
                        {showWeekNumbers && <div className={styles.weeknr} />}
                        {weekdayHeaders.map((dayLabel) => (
                            <div key={dayLabel} className={styles.weekday}>
                                {dayLabel}
                            </div>
                        ))}
                    </HGrid>

                    {weeks.map((weekRow, i) => (
                        <HGrid key={`week-${i}`} columns={nrOfColumns}>
                            {weekRow}
                        </HGrid>
                    ))}
                </div>
            </VStack>
        </Box.New>
    );
};

const findDayColor = (date: Dayjs, periodMap: Map<string, CalendarPeriod>): CalendarPeriodColor => {
    const iso = date.format('YYYY-MM-DD');
    const period = periodMap.get(iso);

    if (!period) {
        return isWeekend(date) ? 'GRAY' : 'NONE';
    }
    if (period.color === 'PINK') {
        return 'PINK';
    }
    if (period.color === 'PURPLE') {
        return 'PURPLE';
    }
    return isWeekend(date) ? 'GRAY' : period.color;
};

const isWeekend = (date: Dayjs) => date.isoWeekday() === 6 || date.isoWeekday() === 7;

const buildPeriodMap = (periods: CalendarPeriod[]) => {
    const map = new Map<string, CalendarPeriod>();
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
