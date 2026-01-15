import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useCallback, useMemo, useState } from 'react';

import { HGrid } from '@navikt/ds-react';

import { Month } from './Month';
import { CalendarPeriod } from './types/CalendarPeriod';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

interface Props {
    periods: CalendarPeriod[];
    showWeekNumbers?: boolean;
    nrOfColumns?: 1 | 2 | 3;
    isRangeSelection?: boolean;
    firstDateInCalendar: string;
    lastDateInCalendar?: string;
    perioderSomErNyligLagtTil?: Array<{ fom: string; tom: string }>;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    setSelectedPeriods?: (value: React.SetStateAction<CalendarPeriod[]>) => void;
    getSrTextForSelectedPeriod?: (period: { fom: string; tom: string }) => string;
}

export const Calendar = ({
    periods,
    showWeekNumbers = true,
    nrOfColumns = 2,
    isRangeSelection = false,
    firstDateInCalendar,
    lastDateInCalendar,
    dateTooltipCallback,
    setSelectedPeriods,
    getSrTextForSelectedPeriod,
    perioderSomErNyligLagtTil = [],
}: Props) => {
    const [focusedDate, setFocusedDate] = useState<dayjs.Dayjs | undefined>();

    const allMonths = useMemo(
        () => findMonths(firstDateInCalendar, lastDateInCalendar),
        [periods, firstDateInCalendar, lastDateInCalendar],
    );
    const periodsByMonth = useMemo(() => groupPeriodsByMonth(allMonths, periods), [allMonths, periods]);

    const dateClickCallback = useCallback(
        (selectedDate: string) =>
            getDateClickCallback(isRangeSelection, getSrTextForSelectedPeriod, setSelectedPeriods)(selectedDate),
        [isRangeSelection, getSrTextForSelectedPeriod, setSelectedPeriods],
    );

    return (
        <HGrid gap="space-12" columns={{ sm: 1, md: nrOfColumns }}>
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
                        showWeekNumbers={showWeekNumbers}
                        dateTooltipCallback={dateTooltipCallback}
                        dateClickCallback={setSelectedPeriods ? dateClickCallback : undefined}
                        focusedDate={isMonthInFocus ? focusedDate : undefined}
                        setFocusedDate={setFocusedDate}
                        perioderSomErNyligLagtTil={perioderSomErNyligLagtTil}
                    />
                );
            })}
        </HGrid>
    );
};

const findMonths = (
    firstDateInCalendar: string,
    lastDateInCalendar?: string,
): Array<{ month: number; year: number }> => {
    const firstDate = dayjs(firstDateInCalendar);
    const lastDate = lastDateInCalendar ? dayjs(lastDateInCalendar) : dayjs(firstDateInCalendar).add(6, 'month');

    const numberOfMonthsBetween = monthDiff(firstDate, lastDate);

    return Array.from({ length: numberOfMonthsBetween + 1 }, (_, i) => {
        const date = firstDate.add(i, 'month');
        return { month: date.month(), year: date.year() };
    });
};

const monthDiff = (d1: dayjs.Dayjs, d2: dayjs.Dayjs): number => {
    let months = (d2.year() - d1.year()) * 12;
    months += d2.month() - d1.month();
    return Math.max(months, 0);
};

const getMonthKey = (year: number, month: number): string => `${year}-${month}`;

const groupPeriodsByMonth = (
    months: Array<{ month: number; year: number }>,
    periods: CalendarPeriod[],
): Map<string, CalendarPeriod[]> => {
    const result = new Map<string, CalendarPeriod[]>();
    for (const { year, month } of months) {
        const monthStart = dayjs().year(year).month(month).startOf('month');
        const monthEnd = monthStart.endOf('month');
        const periodsForMonth = periods.filter(
            (p) => dayjs(p.tom).isSameOrAfter(monthStart, 'day') && dayjs(p.fom).isSameOrBefore(monthEnd, 'day'),
        );
        result.set(getMonthKey(year, month), periodsForMonth);
    }
    return result;
};

const findFomDate = (selectedDate: string, period: CalendarPeriod) =>
    dayjs(period.fom).isBefore(dayjs(selectedDate)) ? period.fom : selectedDate;

const findTomDate = (selectedDate: string, period: CalendarPeriod) => {
    const parsedSelectedDate = dayjs(selectedDate);
    if (dayjs(period.tom).isAfter(parsedSelectedDate) && dayjs(period.fom).isBefore(parsedSelectedDate)) {
        return selectedDate;
    }
    return dayjs(period.tom).isBefore(parsedSelectedDate) ? selectedDate : period.tom;
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const getDateClickCallback =
    (
        isRangeSelection: boolean,
        getSrTextForSelectedPeriod?: (period: { fom: string; tom: string }) => string,
        setSelectedPeriods?: (value: React.SetStateAction<CalendarPeriod[]>) => void,
    ) =>
    (selectedDate: string) => {
        if (!setSelectedPeriods || !getSrTextForSelectedPeriod) {
            return;
        }

        if (isRangeSelection) {
            setSelectedPeriods((old) => {
                const fom = old.length === 0 ? selectedDate : findFomDate(selectedDate, old[0]!);
                const tom = old.length === 0 ? selectedDate : findTomDate(selectedDate, old[0]!);
                return old.some((p) => p.fom === selectedDate || p.tom === selectedDate)
                    ? []
                    : [
                          {
                              color: 'DARKBLUE',
                              fom,
                              tom,
                              isSelected: true,
                              srText: getSrTextForSelectedPeriod({ fom, tom }),
                          },
                      ];
            });
        } else {
            setSelectedPeriods((old) =>
                old.some((p) => p.fom === selectedDate)
                    ? old.filter((p) => p.fom !== selectedDate)
                    : [
                          ...old,
                          {
                              color: 'DARKBLUE',
                              fom: selectedDate,
                              tom: selectedDate,
                              isSelected: true,
                              srText: getSrTextForSelectedPeriod({ fom: selectedDate, tom: selectedDate }),
                          } satisfies CalendarPeriod,
                      ].sort(sortPeriods),
            );
        }
    };
