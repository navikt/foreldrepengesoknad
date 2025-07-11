import { isValidNumber } from '../other/numberValidation';
import { FormValidationResult, isEmpty } from './generalFormValidation';

const integerRegex = /^\s*\d+\s*$/;
const decimalRegex = /^\d+(.\d{1,2})?$/;

export const isValidNumberForm =
    (i18nText: string) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || isValidNumber(text) ? null : i18nText;

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
    (number: number | string): FormValidationResult => {
        const numericValue = typeof number === 'string' ? Number(number) : number;
        return numericValue >= length ? null : i18nText;
    };

export const hasMaxValue =
    (i18nText: string, length: number) =>
    (number: number): FormValidationResult =>
        number <= length ? null : i18nText;

export const formatValue = (value: string) => {
    if (!value) {
        return undefined;
    }
    const formattedValue = value.replace(/,/g, '.');
    const returnValue = Number(formattedValue);
    if (typeof returnValue === 'number') {
        return returnValue;
    }
    return undefined;
};
