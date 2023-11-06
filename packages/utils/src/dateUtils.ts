import dayjs from 'dayjs';
import { DATE_TODAY, DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import { TIME_FORMAT } from '@navikt/fp-constants/src/dates';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type Period = { from: Date; to: Date };

type DateTypes = string | Date | dayjs.Dayjs;
export const formatDate = (date: Date | string) => dayjs(date).format(DDMMYYYY_DATE_FORMAT);
export const formatDateIso = (date: Date | string) => dayjs(date).format(ISO_DATE_FORMAT);
export const formatTime = (date: Date | string) => dayjs(date).format(TIME_FORMAT);

export const isToday = (date: DateTypes): boolean => dayjs(date).isSame(DATE_TODAY, 'day');
export const isAfterToday = (date: DateTypes): boolean => dayjs(date).isAfter(DATE_TODAY, 'day');
export const isBeforeToday = (date: DateTypes): boolean => dayjs(date).isBefore(DATE_TODAY, 'day');
export const isSameOrAfterToday = (date: DateTypes): boolean => dayjs(date).isSameOrAfter(DATE_TODAY, 'day');
export const isSameOrBeforeToday = (date: DateTypes): boolean => dayjs(date).isSameOrBefore(DATE_TODAY, 'day');
export const isDateASameOrBeforeDateB = (dateA: DateTypes, dateB: DateTypes): boolean =>
    dayjs(dateA).isSameOrBefore(dateB, 'day');
export const isDateAAfterDateB = (dateA: DateTypes, dateB: DateTypes): boolean => dayjs(dateA).isAfter(dateB, 'day');
export const isDateWithinRange = (date: Date, minDate: Date, maxDate: Date): boolean =>
    dayjs(date).isBetween(minDate, maxDate, 'day', '[]');

export const erMyndig = (fødselsdato: string) => {
    const now = dayjs();
    const momentDate = dayjs(fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

const sortDateRange = (d1: Period, d2: Period) => {
    return dayjs(d1.from).isSameOrBefore(d2.from) ? -1 : 1;
};

export const isDateRangesOverlapping = (ranges: Period[]) => {
    if (ranges.length > 0) {
        const sortedDates = [...ranges].sort(sortDateRange);
        const hasOverlap = sortedDates.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};
