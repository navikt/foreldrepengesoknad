import * as moment from 'moment';

export const isValidISODate = (date: string) =>
    !!(date && moment(date, moment.ISO_8601).isValid());

export const ISODateToMaskedInput = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const dateFormatIsValid = (date: string) => {
    return date && date !== '' && isValidISODate(date);
};

export const dateFormatsAreValid = (dates: string[]) => {
    const hasInvalidDates = dates.some((currentDate: string) =>
        !dateFormatIsValid(currentDate) || currentDate === undefined
    );
    return !hasInvalidDates;
};

export const buildDateObject = (date?: string) =>
    date !== undefined && isValidISODate(date) ? new Date(date) : date;
