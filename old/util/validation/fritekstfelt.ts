import { IntlShape } from 'react-intl';
import { maxLengthIsGreaterThanOrEqualToStringLengthRule } from './common';
import getMessage from 'common/util/i18nUtils';
import { Validator } from 'common/lib/validation/types';

interface FritekstfeltValidationOptions {
    maxLength?: number;
}

export const getFritekstErrorMessage = (intl: IntlShape, maxLength: number) =>
    getMessage(intl, 'valideringsfeil.fritekst.kanIkkeVæreLengreEnn', { maxLength });

export const getFritekstfeltRules = (
    options: FritekstfeltValidationOptions,
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
    }

    return rules;
};
