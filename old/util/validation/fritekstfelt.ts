import { IntlShape } from 'react-intl';
import { maxLengthIsGreaterThanOrEqualToStringLengthRule, noIllegalCharactersRule } from './common';
import getMessage from 'common/util/i18nUtils';
import { Validator } from 'common/lib/validation/types';
import { getIllegalCharsErrorMessage } from 'app/validation/fieldValidations';

interface FritekstfeltValidationOptions {
    maxLength?: number;
}

export const getFritekstErrorMessage = (intl: IntlShape, maxLength: number) =>
    getMessage(intl, 'valideringsfeil.fritekst.kanIkkeVæreLengreEnn', { maxLength });

export const getFritekstfeltRules = (
    options: FritekstfeltValidationOptions,
    label: string,
    intl: IntlShape,
    value?: string
): Validator[] => {
    const rules = [];
    
    if (value) {
        if (options.maxLength !== undefined) {
            rules.push(
                maxLengthIsGreaterThanOrEqualToStringLengthRule(
                    options.maxLength,
                    value,
                    getFritekstErrorMessage(intl, options.maxLength)
                )
            );
        }
        rules.push(noIllegalCharactersRule(value, getIllegalCharsErrorMessage(value, label, intl)));
    }

    return rules;
};
