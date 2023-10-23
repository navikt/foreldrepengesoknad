import dayjs from 'dayjs';
import { DATE_TODAY } from '@navikt/fp-constants';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DATE_FORMAT = 'DD.MM.YYYY';

export const formatDate = (date: Date | string) => dayjs(date).format(DATE_FORMAT);

export const isAfterToday = (date: string): boolean => dayjs(date).isAfter(DATE_TODAY, 'day');
export const isBeforeToday = (date: string): boolean => dayjs(date).isBefore(DATE_TODAY, 'day');
export const isSameOrAfterToday = (date: string): boolean => dayjs(date).isSameOrAfter(DATE_TODAY, 'day');
export const isSameOrBeforeToday = (date: string): boolean => dayjs(date).isSameOrBefore(DATE_TODAY, 'day');
export const isToday = (date: string): boolean => dayjs(date).isSame(DATE_TODAY, 'day');
export const isDateWithinRange = (date: Date, minDate: Date, maxDate: Date): boolean =>
    dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
