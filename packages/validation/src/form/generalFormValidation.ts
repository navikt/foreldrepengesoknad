import dayjs from 'dayjs';

export const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export type FormValidationResult = string | null;

export const isRequired =
    (i18nText: string) =>
    (value?: string | number | boolean): FormValidationResult =>
        isEmpty(value) ? i18nText : null;
