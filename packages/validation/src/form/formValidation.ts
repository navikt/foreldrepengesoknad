import dayjs from 'dayjs';
import { DATE_TODAY } from '@navikt/fp-constants';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

//TODO Denne fila må slåast i saman med validering-fila som ligg i fp-common. Må diskutera eit format desse skal skrivast på

type FormValidationResult = string | null;

const isoDateRegex = /(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;

const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export const isRequired =
    (errorMessage: string) =>
    (value?: string | number): FormValidationResult =>
        isEmpty(value) ? errorMessage : null;

export const isValidDate =
    (errorMessage: string) =>
    (text: string): FormValidationResult =>
        isEmpty(text) || isoDateRegex.test(text) ? null : errorMessage;

export const isAfterToday =
    (errorMessage: string) =>
    (dato: string): FormValidationResult => {
        return dayjs(dato).isAfter(DATE_TODAY) ? errorMessage : null;
    };

export const validateDatesNotEqual = (errorMessage: string, date1?: string) => (date2?: string) =>
    date1 && date2 && dayjs(date1).isSame(date2) ? errorMessage : null;

export const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};
