import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { DATE_TODAY, ISO_DATE_REGEX } from '@navikt/fp-constants';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type DateTypes = string | dayjs.Dayjs;
type Period = { from: DateTypes; to: DateTypes };

export const isValidDate = (date?: string): boolean => !!date && dayjs(date).isValid() && ISO_DATE_REGEX.test(date);
export const isToday = (date: DateTypes): boolean => dayjs(date).isSame(DATE_TODAY, 'day');
export const isAfterToday = (date: DateTypes): boolean => dayjs(date).isAfter(DATE_TODAY, 'day');
export const isBeforeToday = (date: DateTypes): boolean => dayjs(date).isBefore(DATE_TODAY, 'day');
export const isSameOrAfterToday = (date: DateTypes): boolean => dayjs(date).isSameOrAfter(DATE_TODAY, 'day');
export const isSameOrBeforeToday = (date: DateTypes): boolean => dayjs(date).isSameOrBefore(DATE_TODAY, 'day');
export const isDateASameOrBeforeDateB = (dateA: DateTypes, dateB: DateTypes): boolean =>
    dayjs(dateA).isSameOrBefore(dateB, 'day');
export const isDateAAfterDateB = (dateA: DateTypes, dateB: DateTypes): boolean => dayjs(dateA).isAfter(dateB, 'day');
export const isDateWithinRange = (date: DateTypes, minDate: DateTypes, maxDate: DateTypes): boolean =>
    dayjs(date).isBetween(minDate, maxDate, 'day', '[]');

const sortDateRange = (d1: Period, d2: Period): number => {
    return dayjs(d1.from).isSameOrBefore(d2.from) ? -1 : 1;
};

export const isDateRangesOverlapping = (ranges: Period[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = [...ranges].sort(sortDateRange);
        const hasOverlap = sortedDates.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1]!.from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};
