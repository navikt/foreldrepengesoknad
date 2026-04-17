import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React from 'react';

import { Box, HGrid, Heading, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { capitalizeFirstLetter, formatDateIso } from '@navikt/fp-utils';

import { Day, DayShape, isWeekend, logOnLocalhost } from './Day';
import styles from './month.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

dayjs.extend(isoWeek);

interface Props {
    year: number;
    month: number;
    isFirstMonth: boolean;
    showWeekNumbers: boolean;
    periods: CalendarPeriod[];
    focusedDate: Dayjs | undefined;
    pendingFom: string | undefined;
    hoverDate: string | undefined;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    onDateHover?: (date: string | undefined) => void;
    setFocusedDate: (date: Dayjs) => void;
}

export const Month = ({
    year,
    month,
    isFirstMonth,
    showWeekNumbers,
    periods,
    focusedDate,
    pendingFom,
    hoverDate,
    dateTooltipCallback,
    dateClickCallback,
    onDateHover,
    setFocusedDate,
}: Props) => {
    logOnLocalhost(`Rendering Month: ${month}-${year}`);

    const periodMap = buildPeriodMap(periods);

    const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');

    const hoverPreviewSet = (() => {
        const hoveredDays = new Set<string>();
        if (!pendingFom || !hoverDate) {
            return hoveredDays;
        }

        const fom = dayjs(pendingFom).isBefore(hoverDate) ? pendingFom : hoverDate;
        const tom = dayjs(pendingFom).isBefore(hoverDate) ? hoverDate : pendingFom;

        const lastDayOfMonth = firstDayOfMonth.endOf('month');

        let current = dayjs(fom).isBefore(firstDayOfMonth) ? firstDayOfMonth : dayjs(fom);
        const end = dayjs(tom).isAfter(lastDayOfMonth) ? lastDayOfMonth : dayjs(tom);

        while (!current.isAfter(end)) {
            if (!isWeekend(current)) {
                hoveredDays.add(current.format(ISO_DATE_FORMAT));
            }
            current = current.add(1, 'day');
        }

        return hoveredDays;
    })();

    const daysInMonth = firstDayOfMonth.daysInMonth();
    const startWeekDay = firstDayOfMonth.isoWeekday();
    const endWeekDay = firstDayOfMonth.endOf('month').isoWeekday();
    const firstWeekNrOfMonth = firstDayOfMonth.isoWeek();

    const nrOfWeeks = Math.ceil((daysInMonth + (startWeekDay - 1) + (7 - endWeekDay)) / 7);

    const nrOfColumns = showWeekNumbers ? 8 : 7;

    const weekdayHeaders = Array.from({ length: 7 }, (_, i) => firstDayOfMonth.isoWeekday(i + 1).format('dd'));

    return (
        <Box
            borderWidth="1"
            maxWidth="400px"
            padding="space-12"
            borderRadius="4"
            borderColor="neutral-subtle"
            data-testid={`year:${year};month:${month}`}
        >
            <VStack gap="space-12">
                <Heading size="small" level="4" align="center">
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

                                    const period = periodMap.get(formatDateIso(date));

                                    return (
                                        <Day
                                            key={`${year}-${month}-${date.date()}`}
                                            isoDate={formatDateIso(date)}
                                            periodeColor={findDayColor(date, period)}
                                            srText={period?.srText}
                                            isUpdated={period?.isUpdated}
                                            isHoverPreview={hoverPreviewSet.has(formatDateIso(date))}
                                            Icon={period?.icon}
                                            iconFull={period?.iconFull}
                                            shape={getDayShape(date, periodMap, hoverPreviewSet)}
                                            dateTooltipCallback={dateTooltipCallback}
                                            dateClickCallback={dateClickCallback}
                                            onDateHover={onDateHover}
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
        </Box>
    );
};

const getDayShape = (
    date: dayjs.Dayjs,
    periodMap: Map<string, CalendarPeriod>,
    hoverPreviewSet: Set<string>,
): DayShape => {
    const key = date.format(ISO_DATE_FORMAT);
    const isInPreview = hoverPreviewSet.has(key);
    const isInSelectedPeriod = periodMap.get(key)?.isSelected;

    if (!isInSelectedPeriod && !isInPreview) {
        return 'square';
    }

    const prevKey = getPreviousWeekday(date).format(ISO_DATE_FORMAT);
    const nextKey = getNextWeekday(date).format(ISO_DATE_FORMAT);

    const prevActive = isInPreview ? hoverPreviewSet.has(prevKey) : periodMap.get(prevKey)?.isSelected;
    const nextActive = isInPreview ? hoverPreviewSet.has(nextKey) : periodMap.get(nextKey)?.isSelected;

    if (!prevActive && !nextActive) {
        return 'square';
    }
    if (!prevActive) {
        return 'rounded-left';
    }
    if (!nextActive) {
        return 'rounded-right';
    }

    return 'square';
};

const getPreviousWeekday = (date: dayjs.Dayjs) => {
    let d = date.subtract(1, 'day');
    while (isWeekend(d)) {
        d = d.subtract(1, 'day');
    }
    return d;
};

const getNextWeekday = (date: dayjs.Dayjs) => {
    let d = date.add(1, 'day');
    while (isWeekend(d)) {
        d = d.add(1, 'day');
    }
    return d;
};

const findDayColor = (date: Dayjs, period?: CalendarPeriod): CalendarPeriodColor => {
    if (!period) {
        return isWeekend(date) ? 'GRAY' : 'NONE';
    }

    return isWeekend(date) ? 'GRAY' : period.color;
};

const buildPeriodMap = (periods: CalendarPeriod[]) => {
    const map = new Map<string, CalendarPeriod>();
    for (const period of periods) {
        let current = dayjs(period.fom);
        const end = dayjs(period.tom);
        while (!current.isAfter(end, 'day')) {
            const iso = current.format('YYYY-MM-DD');
            if (!map.has(iso) || period.isSelected) {
                map.set(iso, period);
            }
            current = current.add(1, 'day');
        }
    }
    return map;
};
