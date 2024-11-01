import dayjs from 'dayjs';

export const textRegex = /^[\p{N}\p{L}\p{Z}\p{Cf}\p{P}\p{Sc}\p{Sk}\n\r+]*$/u;
export const textGyldigRegex = /[\p{N}\p{L}\p{Z}\p{Cf}\p{P}\p{Sc}\p{Sk}\n\r+]*/gu;

export const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export type FormValidationResult = string | null;

export const isRequired =
    (i18nText: string) =>
    (value?: string | number | boolean): FormValidationResult =>
        isEmpty(value) ? i18nText : null;

export const isNotEqualValue =
    (i18nText: string, value: string) =>
    (fieldValue?: string | number): FormValidationResult =>
        fieldValue === value ? i18nText : null;

export const hasMinLength =
    (i18nText: string, length: number) =>
    (text: string): FormValidationResult =>
        isEmpty(text) || text.toString().trim().length >= length ? null : i18nText;
export const hasMaxLength =
    (i18nText: string, length: number) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || text.toString().trim().length <= length ? null : i18nText;

const getIllegalChars = (value: string): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};
export const hasLegalChars =
    (getI18nText: (illigalChars: string) => string | null) =>
    (value: string): FormValidationResult =>
        textRegex.test(value) ? null : getI18nText(getIllegalChars(value));
