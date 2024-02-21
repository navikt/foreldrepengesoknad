import dayjs from 'dayjs';
import { ISO_DATE_REGEX } from '../form/dateFormValidation';

// Throw Error when undefined or null, otherwise return non-nullable version of object
export const notEmpty = <T>(data: T): NonNullable<T> => {
    if (data === undefined || data === null) {
        throw Error('Data er ikke oppgitt');
    }
    return data;
};

export const isStringAValidDate = (date?: string): boolean =>
    !!date && dayjs(date).isValid() && ISO_DATE_REGEX.test(date);
