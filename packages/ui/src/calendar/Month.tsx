import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

import { Box, HGrid, Heading, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter, formatDateIso } from '@navikt/fp-utils';

import { Day, isWeekend, logOnLocalhost } from './Day';
import styles from './month.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

dayjs.extend(isoWeek);

interface Props {
    year: number;
    month: number;
    isFirstMonth: boolean;
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
    periods: CalendarPeriod[];
    focusedDate: Dayjs | undefined;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    setFocusedDate: (date: Dayjs) => void;
}

export const Month = React.memo(
    ({
        year,
        month,
        isFirstMonth,
        headerLevel,
        showWeekNumbers,
        periods,
        focusedDate,
        dateTooltipCallback,
        dateClickCallback,
        setFocusedDate,
    }: Props) => {
        logOnLocalhost(`Rendering Month: ${month}-${year}`);

        const periodMap = useMemo(() => buildPeriodMap(periods), [periods]);

        const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
        const daysInMonth = firstDayOfMonth.daysInMonth();
        const startWeekDay = firstDayOfMonth.isoWeekday();
        const endWeekDay = firstDayOfMonth.endOf('month').isoWeekday();
        const firstWeekNrOfMonth = firstDayOfMonth.isoWeek();

        const nrOfWeeks = Math.ceil((daysInMonth + (startWeekDay - 1) + (7 - endWeekDay)) / 7);

        const nrOfColumns = showWeekNumbers ? 8 : 7;

        const weekdayHeaders = Array.from({ length: 7 }, (_, i) => firstDayOfMonth.isoWeekday(i + 1).format('dd'));

        return (
            <Box.New
                borderWidth="1"
                maxWidth="400px"
                padding="3"
                borderRadius="4"
                borderColor="neutral-subtle"
                data-testid={`year:${year};month:${month}`}
            >
                <VStack gap="space-12">
                    <Heading size="small" level={headerLevel} align="center">
                        {`${capitalizeFirstLetter(firstDayOfMonth.format('MMMM'))} ${year}`}
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

                        {Array.from({ length: nrOfWeeks }).map((_, week) => {
                            return (
                                <HGrid key={`week-${week}`} columns={nrOfColumns}>
                                    {showWeekNumbers && (
                                        <div key={`weeknr-${week}`} className={styles.weeknr}>
                                            {firstWeekNrOfMonth + week}
                                        </div>
                                    )}
                                    {Array.from({ length: 7 }).map((__, day) => {
                                        const cellIndex = week * 7 + day;
                                        const isBeforeMonth = week === 0 && day < startWeekDay - 1;
                                        const isAfterMonth = week === nrOfWeeks - 1 && day >= endWeekDay;

                                        if (isBeforeMonth || isAfterMonth) {
                                            return <div key={`empty-${cellIndex}`} />;
                                        }

                                        const date = firstDayOfMonth.add(cellIndex - (startWeekDay - 1), 'day');

                                        return (
                                            <Day
                                                key={`${year}-${month}-${date.date()}`}
                                                isoDate={formatDateIso(date)}
                                                periodeColor={findDayColor(date, periodMap)}
                                                dateTooltipCallback={dateTooltipCallback}
                                                dateClickCallback={dateClickCallback}
                                                isFocused={
                                                    focusedDate?.isSame(date, 'day') ??
                                                    (isFirstMonth && cellIndex === startWeekDay - 1) ??
                                                    false
                                                }
                                                setFocusedDate={setFocusedDate}
                                            />
                                        );
                                    })}
                                </HGrid>
                            );
                        })}
                    </div>
                </VStack>
            </Box.New>
        );
    },
    (prev, next) => {
        const keys = Object.keys(prev) as Array<keyof Props>;
        for (const key of keys) {
            if (key !== 'periods' && prev[key] !== next[key]) {
                return false;
            }
        }

        // Sjekk verdiar i perioder spesifikt, fordi periodane vil ligga i eit nytt array etter kvar endring
        if (prev.periods.length !== next.periods.length) {
            return false;
        }
        for (let i = 0; i < prev.periods.length; i++) {
            const prevPeriod = prev.periods[i];
            const nextPeriod = next.periods[i];
            const periodKeys = Object.keys(prevPeriod) as Array<keyof typeof prevPeriod>;
            for (const key of periodKeys) {
                if (prevPeriod[key] !== nextPeriod[key]) {
                    return false;
                }
            }
        }
        return true;
    },
);

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
