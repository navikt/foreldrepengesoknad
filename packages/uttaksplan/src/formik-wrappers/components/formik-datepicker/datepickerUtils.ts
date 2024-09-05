import dayjs from 'dayjs';
import { Matcher } from 'react-day-picker';

import { DatepickerLimitations } from './FormikDatepicker';
import { ISODateString, ISO_DATE_STRING_FORMAT } from './dateFormatUtils';

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');
export const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

export const getDisabledDates = (limitations: DatepickerLimitations): Matcher[] => {
    const invalidDates: Matcher[] = [];
    if (limitations.disabledDateRanges) {
        limitations.disabledDateRanges.forEach(({ from, to }) => {
            if (from && to) {
                invalidDates.push({
                    from,
                    to,
                });
            }
        });
    }
    const minDate = limitations.minDate;
    const maxDate = limitations.maxDate;

    const disabledWeekdays: Matcher = {
        dayOfWeek: [
            ...(limitations.disableWeekends ? [0, 6] : []),
            ...(limitations.disabledDaysOfWeek?.dayOfWeek || []),
        ],
    };
    return [
        ...invalidDates,
        ...(maxDate ? [{ after: dayjs(maxDate, ISO_DATE_STRING_FORMAT).toDate() } as Matcher] : []),
        ...(minDate ? [{ before: dayjs(minDate, ISO_DATE_STRING_FORMAT).toDate() } as Matcher] : []),
        ...[disabledWeekdays],
    ];
};

const getDateStringFromValue = (value?: Date | string): string | undefined => {
    let date;
    if (value && typeof value === 'string') {
        if (isISODateString(value) === false) {
            return value;
        }
        if (dayjs(value, isoStringFormat, true).isValid()) {
            date = new Date(value);
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOString(date) : undefined;
};

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return new Date(dateString);
    }
    return undefined;
};

/** Check if dateString has format DD.MM.YYYY, or D.M.YY */
const isValidFormattedDateString = (dateString = ''): boolean => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};

export const isISODateString = (value: any): value is ISODateString => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    getDisabledDates,
    isValidFormattedDateString,
};

export default datepickerUtils;
