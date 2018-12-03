import { Validator } from 'common/lib/validation/types';
import { InjectedIntl } from 'react-intl';
import { maxLengthIsGreaterThanOrEqualToStringLengthRule } from './common';
import getMessage from 'common/util/i18nUtils';

interface FritekstfeltValidationOptions {
    maxLength?: number;
}

export const getFritekstfeltRules = (
    options: FritekstfeltValidationOptions,
    intl: InjectedIntl,
    value?: string
): Validator[] => {
    const intlKey = 'valideringsfeil.fritekst';
    const rules = [];

    if (value) {
        if (options.maxLength !== undefined) {
            rules.push(
                maxLengthIsGreaterThanOrEqualToStringLengthRule(
                    options.maxLength,
                    value,
                    getMessage(intl, `${intlKey}.kanIkkeVæreLengreEnn`, { maxLength: options.maxLength })
                )
            );
        }
    }

    return rules;
};
