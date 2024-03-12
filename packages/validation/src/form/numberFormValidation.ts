import { FormValidationResult, isEmpty } from './generalFormValidation';

const numberRegex = /^\d+([,.]\d+)?$/;
const integerRegex = /^\s*\d+\s*$/;
const decimalRegex = /^\d+(.\d{1,2})?$/;

export const isValidNumber =
    (i18nText: string) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || numberRegex.test(text.toString()) ? null : i18nText;

export const isValidInteger =
    (i18nText: string) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || integerRegex.test(text.toString()) ? null : i18nText;

export const isValidDecimal =
    (i18nText: string) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || decimalRegex.test(text.toString()) ? null : i18nText;

export const hasMinValue =
    (i18nText: string, length: number) =>
    (number: number): FormValidationResult =>
        number >= length ? null : i18nText;
export const hasMaxValue =
    (i18nText: string, length: number) =>
    (number: number): FormValidationResult =>
        number <= length ? null : i18nText;
