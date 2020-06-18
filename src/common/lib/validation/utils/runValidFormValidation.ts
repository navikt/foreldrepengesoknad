import { ValidationResult, Validator, ValidationTestVerdict } from 'common/lib/validation/types';

export const runValidators = (validators: Validator[] | undefined, inputName: string): ValidationResult => {
    if (validators === undefined) {
        return {
            name: inputName,
            tests: [],
            valid: true,
        };
    }
    const results: Validator[] = validators.filter((validator) => {
        return validator.test() === false;
    });

    const valid = results.length === 0;
    const tests: ValidationTestVerdict[] = valid === false ? [{ verdict: false, failText: results[0].failText }] : [];

    return {
        name: inputName,
        tests,
        valid,
    };
};

export const allValidatorsPass = (validators: Validator[] | undefined): boolean =>
    validators === undefined ? true : runValidators(validators, 'group').valid;
