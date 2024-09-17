import { ValidationFunction } from './types';

export enum ValidateListError {
    listIsEmpty = 'listIsEmpty',
    listHasTooFewItems = 'listHasTooFewItems',
    listHasTooManyItems = 'listHastooManyItems',
}

type ListValidationResult = undefined | ValidateListError;

interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}

const getListValidator =
    (options: Options): ValidationFunction<ListValidationResult> =>
    (value: any) => {
        const { required = false, minItems = undefined, maxItems = undefined } = options;
        if (Array.isArray(value)) {
            const numItems = value.length;
            if (required && numItems === 0) {
                return ValidateListError.listIsEmpty;
            }
            if (minItems !== undefined && minItems > numItems) {
                return ValidateListError.listHasTooFewItems;
            }
            if (maxItems !== undefined && maxItems < numItems) {
                return ValidateListError.listHasTooManyItems;
            }
        }
        if (required && !Array.isArray(value)) {
            return ValidateListError.listIsEmpty;
        }
        return undefined;
    };

export default getListValidator;
