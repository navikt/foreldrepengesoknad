import { getNumberFromStringInput, hasValue } from './validationUtils';
import { ValidationFunction } from './types';

export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
    numberHasDecimals = 'numberHasDecimals',
}

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall
    | ValidateNumberError.numberHasDecimals;

interface Options {
    required?: boolean;
    min?: number;
    max?: number;
    allowDecimals?: boolean;
}

const getNumberValidator =
    (options: Options = {}): ValidationFunction<NumberValidationResult> =>
    (value: any) => {
        const { required, min, max, allowDecimals = true } = options;
        const numberValue = getNumberFromStringInput(value);

        if (required) {
            if (hasValue(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
                return ValidateNumberError.numberHasNoValue;
            }
        }

        if (hasValue(value)) {
            if (numberValue === undefined) {
                return ValidateNumberError.numberHasInvalidFormat;
            }
            if (allowDecimals === false && Math.round(numberValue) !== numberValue) {
                return ValidateNumberError.numberHasDecimals;
            }
            if (min !== undefined && numberValue < min) {
                return ValidateNumberError.numberIsTooSmall;
            }
            if (max !== undefined && numberValue > max) {
                return ValidateNumberError.numberIsTooLarge;
            }
        }
        return undefined;
    };

export default getNumberValidator;
