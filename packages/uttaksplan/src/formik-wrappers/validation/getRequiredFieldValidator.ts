import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const getRequiredFieldValidator = (): ValidationFunction<RequiredFieldValidationResult> => (value: any) => {
    if (hasValue(value) === false) {
        return ValidateRequiredFieldError.noValue;
    }
    return undefined;
};

// eslint-disable-next-line import/no-default-export
export default getRequiredFieldValidator;
