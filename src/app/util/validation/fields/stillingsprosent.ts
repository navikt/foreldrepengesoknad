import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { getFloatFromString } from 'common/util/numberUtils';

const isStillingsprosentMax100Percent = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst <= 100 && pst > 0;
    }
    return false;
};

export const getStillingsprosentRegler = (
    stillingsprosent: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: getMessage(intl, `${intlKey}.ugyldigTall`)
        },
        {
            test: () => isStillingsprosentMax100Percent(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.over100prosent`)
        }
    ];
};
