import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { getFloatFromString } from 'common/util/numberUtils';

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
export const isStillingsprosentAbove0AndLessThan100 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return isStillingsprosentAbove0(stillingsprosent) && pst < 100;
    }
    return false;
};

export const getStillingsprosentRegler = (stillingsprosent: string, intl: InjectedIntl): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        {
            test: () => stillingsprosent !== undefined && stillingsprosent !== '',
            failText: getMessage(intl, `${intlKey}.required`)
        },
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: getMessage(intl, `${intlKey}.ugyldigTall`)
        },
        {
            test: () => isStillingsprosentMax100Percent(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.over100prosent`)
        },
        {
            test: () => isStillingsprosentAbove0(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.under0`)
        }
    ];
};
