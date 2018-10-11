import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { getFloatFromString } from 'common/util/numberUtils';
import { hasValueRule } from './common';

const isStillingsprosentMax100Percent = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst <= 100;
    }
    return false;
};

const isStillingsprosentAbove0 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst > 0;
    }
    return false;
};

export const getStillingsprosentRegler = (stillingsprosent: string, intl: InjectedIntl): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        hasValueRule(stillingsprosent, getMessage(intl, `${intlKey}.required`)),
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: getMessage(intl, `${intlKey}.ugyldigTall`)
        },
        {
            test: () => isStillingsprosentAbove0(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.under1`)
        },
        {
            test: () => isStillingsprosentMax100Percent(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.over100prosent`)
        }
    ];
};
