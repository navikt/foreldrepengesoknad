import { DATE_TODAY } from '@navikt/fp-constants';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// Throw Error when undefined or null, otherwise return non-nullable version of object
export const notEmpty = <T>(data: T): NonNullable<T> => {
    if (data === undefined || data === null) {
        throw Error('Data er ikke oppgitt');
    }
    return data;
};

export const isAfterToday = (date: string): boolean => dayjs(date).isAfter(DATE_TODAY, 'day');
export const isBeforeToday = (date: string): boolean => dayjs(date).isBefore(DATE_TODAY, 'day');
export const isSameOrAfterToday = (date: string): boolean => dayjs(date).isSameOrAfter(DATE_TODAY);
export const isSameOrBeforeToday = (date: string): boolean => dayjs(date).isSameOrBefore(DATE_TODAY);
