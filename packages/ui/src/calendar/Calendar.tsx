import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HGrid } from '@navikt/ds-react';

import { Month } from './Month';
import { CalendarPeriod } from './types/CalendarPeriod';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

interface Props {
    periods: CalendarPeriod[];
    showWeekNumbers?: boolean;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    setSelectedPeriods?: (value: React.SetStateAction<CalendarPeriod[]>) => void;
    isRangeSelection?: boolean;
    getSrTextForSelectedPeriod?: (period: { fom: string; tom: string }) => string;
    firstDateInCalendar: string;
    lastDateInCalendar?: string;
    monthsToAddToStart?: number;
    monthsToAddToLast?: number;
}

export const Calendar = ({
    periods,
    showWeekNumbers = true,
    dateTooltipCallback,
    setSelectedPeriods,
    isRangeSelection = false,
    getSrTextForSelectedPeriod,
    firstDateInCalendar,
    lastDateInCalendar,
    monthsToAddToLast = 2,
    monthsToAddToStart = 3,
}: Props) => {
    const [additionalMonthsToAddToLast, setAdditionalMonthsToAddToLast] = useState(0);
    const allMonths = useMemo(
        () =>
            findMonths(
                additionalMonthsToAddToLast + monthsToAddToLast,
                monthsToAddToStart,
                firstDateInCalendar,
                lastDateInCalendar,
            ),
        [
            periods,
            firstDateInCalendar,
            lastDateInCalendar,
            additionalMonthsToAddToLast,
            monthsToAddToLast,
            monthsToAddToStart,
        ],
    );
    const periodsByMonth = useMemo(() => groupPeriodsByMonth(allMonths, periods), [allMonths, periods]);

    const [focusedDate, setFocusedDate] = useState<dayjs.Dayjs | undefined>();

    const dateClickCallback = useCallback(
        (selectedDate: string) => {
            if (!setSelectedPeriods || !getSrTextForSelectedPeriod) {
                return;
            }

            if (isRangeSelection) {
                setSelectedPeriods((old) => {
                    const fom = old.length === 0 ? selectedDate : findFomDate(old[0]!, selectedDate);
                    const tom = old.length === 0 ? selectedDate : findTomDate(old[0]!, selectedDate);
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
        },
        [isRangeSelection, getSrTextForSelectedPeriod, setSelectedPeriods],
    );

    return (
        <>
            {!setSelectedPeriods && periods.some((p) => p.srText) && (
                <div className="sr-only">
                    {periods
                        .filter((p) => p.srText)
                        .map((p) => p.srText)
                        .toString()}
                </div>
            )}
            <HGrid gap="space-12" columns={{ sm: 1, md: setSelectedPeriods ? 1 : 2 }}>
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
                        />
                    );
                })}
                <Button
                    onClick={() => setAdditionalMonthsToAddToLast((value) => value + 3)}
                    type="button"
                    variant="secondary"
                    size="small"
                >
                    <FormattedMessage id="Calendar.LeggTilMåneder" />
                </Button>
            </HGrid>
        </>
    );
};

const findMonths = (
    monthsToAddToLast: number,
    monthsToAddToStart: number,
    firstDateInCalendar: string,
    lastDateInCalendar?: string,
): Array<{ month: number; year: number }> => {
    const firstDate = dayjs(firstDateInCalendar);
    const lastDate = lastDateInCalendar ? dayjs(lastDateInCalendar) : dayjs(firstDateInCalendar).add(6, 'month');

    const firstDateInCalendarAdjusted = firstDate.subtract(monthsToAddToStart, 'month');
    const lastDateInCalendarAdjusted = lastDate.add(monthsToAddToLast, 'month');

    const numberOfMonthsBetween = monthDiff(firstDateInCalendarAdjusted.toDate(), lastDateInCalendarAdjusted.toDate());

    return Array.from({ length: numberOfMonthsBetween }, (_, i) => {
        const date = firstDateInCalendarAdjusted.add(i, 'month');
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

const findFomDate = (period: CalendarPeriod, selectedDate: string) =>
    dayjs(period.fom).isBefore(dayjs(selectedDate)) ? period.fom : selectedDate;

const findTomDate = (period: CalendarPeriod, selectedDate: string) => {
    const parsedSelectedDate = dayjs(selectedDate);
    if (dayjs(period.tom).isAfter(parsedSelectedDate) && dayjs(period.fom).isBefore(parsedSelectedDate)) {
        return selectedDate;
    }
    return dayjs(period.tom).isBefore(parsedSelectedDate) ? selectedDate : period.tom;
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));
