import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { getFloatFromString } from 'common/util/numberUtils';
import { hasValueRule } from './common';

const stillingsprosentIsLessThan100 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst < 100;
    }
    return false;
};

const samtidigUttakProsentIsMax100 = (samtidigUttakProsent: string): boolean => {
    const pst = getFloatFromString(samtidigUttakProsent);

    if (pst) {
        return pst <= 100;
    }

    return false;
};

const stillingsprosentIsMoreThan0 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst > 0;
    }
    return false;
};

export const getStillingsprosentRegler = (
    erSamtidigUttak: boolean,
    stillingsprosent: string,
    intl?: IntlShape
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        hasValueRule(stillingsprosent, intl ? getMessage(intl, `${intlKey}.required`) : ''),
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: intl ? getMessage(intl, `${intlKey}.ugyldigTall`) : '',
        },
        {
            test: () => stillingsprosentIsMoreThan0(stillingsprosent),
            failText: intl ? getMessage(intl, `${intlKey}.under1`) : '',
        },
        {
            test: () =>
                erSamtidigUttak
                    ? samtidigUttakProsentIsMax100(stillingsprosent)
                    : stillingsprosentIsLessThan100(stillingsprosent),
            failText: intl ? getMessage(intl, `${intlKey}.over100prosent`) : '',
        },
    ];
};
