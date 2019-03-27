import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { hasValueRule } from './common';

const stillingsprosentIsLessThan100 = (stillingsprosent: number): boolean => {
    if (stillingsprosent) {
        return stillingsprosent < 100;
    }
    return false;
};

const samtidigUttakProsentIsMax100 = (samtidigUttakProsent: number): boolean => {
    if (samtidigUttakProsent) {
        return samtidigUttakProsent <= 100;
    }

    return false;
};

const stillingsprosentIsMoreThan0 = (stillingsprosent: number): boolean => {
    if (stillingsprosent) {
        return stillingsprosent > 0;
    }
    return false;
};

export const getStillingsprosentRegler = (
    erSamtidigUttak: boolean,
    stillingsprosent: number,
    intl?: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        hasValueRule(stillingsprosent, intl ? getMessage(intl, `${intlKey}.required`) : ''),
        {
            test: () => stillingsprosent !== undefined,
            failText: intl ? getMessage(intl, `${intlKey}.ugyldigTall`) : ''
        },
        {
            test: () => stillingsprosentIsMoreThan0(stillingsprosent),
            failText: intl ? getMessage(intl, `${intlKey}.under1`) : ''
        },
        {
            test: () =>
                erSamtidigUttak
                    ? samtidigUttakProsentIsMax100(stillingsprosent)
                    : stillingsprosentIsLessThan100(stillingsprosent),
            failText: intl ? getMessage(intl, `${intlKey}.over100prosent`) : ''
        }
    ];
};
