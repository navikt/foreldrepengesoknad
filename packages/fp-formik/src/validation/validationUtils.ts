import { ValidationError, ValidationResult } from './types';

export const hasValue = (value: any): boolean => value !== '' && value !== undefined && value !== null;

export const validateAll = <ErrorType = ValidationError>(
    validations: Array<() => ValidationResult<ErrorType>>,
): ErrorType | undefined => {
    let result: ValidationResult<ErrorType>;
    validations.some((validateFunc) => {
        const validationResult = validateFunc();
        if (validationResult) {
            result = validationResult;
            return true;
        }
        return false;
    });
    return result;
};

export const getNumberFromStringInput = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/,/g, '.').trim();
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
