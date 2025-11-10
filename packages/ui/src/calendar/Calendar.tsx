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
    useSmallerWidth?: boolean;
    showWeekNumbers?: boolean;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    setSelectedPeriods?: (value: React.SetStateAction<CalendarPeriod[]>) => void;
    isRangeSelection?: boolean;
}

export const Calendar = ({
    periods,
    useSmallerWidth = false,
    showWeekNumbers = true,
    dateTooltipCallback,
    setSelectedPeriods,
    isRangeSelection = false,
}: Props) => {
    const allMonths = useMemo(() => findMonths(periods[0].fom, findLatestTom(periods)), [periods]);
    const periodsByMonth = useMemo(() => groupPeriodsByMonth(allMonths, periods), [allMonths, periods]);

    const [focusedDate, setFocusedDate] = useState<dayjs.Dayjs | undefined>();

    const dateClickCallback = useCallback(
        (selectedDate: string) => {
            if (!setSelectedPeriods) {
                return;
            }

            if (isRangeSelection) {
                setSelectedPeriods((old) =>
                    old.some((p) => p.fom === selectedDate || p.tom === selectedDate)
                        ? []
                        : [
                              {
                                  color: 'DARKBLUE',
                                  fom: old.length === 0 ? selectedDate : findFomDate(old[0].fom, selectedDate),
                                  tom: old.length === 0 ? selectedDate : findTomDate(old[0].fom, selectedDate),
                                  isSelected: true,
                                  srText: '',
                              },
                          ],
                );
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
                                  srText: '',
                              } satisfies CalendarPeriod,
                          ].sort(sortPeriods),
                );
            }
        },
        [isRangeSelection, setSelectedPeriods],
    );

    return (
        <>
            {periods.some((p) => p.srText) && (
                <div className="sr-only">
                    {periods
                        .filter((p) => p.srText)
                        .map((p) => p.srText)
                        .toString()}
                </div>
            )}
            <HGrid gap="space-24" columns={{ sm: 1, md: setSelectedPeriods ? 1 : 2 }}>
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
                            dateClickCallback={setSelectedPeriods ? dateClickCallback : undefined}
                            focusedDate={isMonthInFocus ? focusedDate : undefined}
                            setFocusedDate={setFocusedDate}
                        />
                    );
                })}
            </HGrid>
        </>
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

const groupPeriodsByMonth = (
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

const findFomDate = (date1: string, date2: string) => (dayjs(date1).isBefore(dayjs(date2)) ? date1 : date2);

const findTomDate = (date1: string, date2: string) => (dayjs(date1).isBefore(dayjs(date2)) ? date2 : date1);

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));
