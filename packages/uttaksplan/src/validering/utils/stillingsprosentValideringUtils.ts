import {
    getFloatFromString,
    intlUtils,
    samtidigUttakProsentIsMax100,
    stillingsprosentIsLessThan100,
    stillingsprosentIsMoreThan0,
} from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { hasValueRule } from './regelUtils';
import { Validator } from './types/validatorTypes';

export const getStillingsprosentRegler = (
    erSamtidigUttak: boolean,
    stillingsprosent: string,
    intl?: IntlShape,
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        hasValueRule(stillingsprosent, intl ? intlUtils(intl, `${intlKey}.required`) : ''),
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: intl ? intlUtils(intl, `${intlKey}.ugyldigTall`) : '',
        },
        {
            test: () => stillingsprosentIsMoreThan0(stillingsprosent),
            failText: intl ? intlUtils(intl, `${intlKey}.under1`) : '',
        },
        {
            test: () =>
                erSamtidigUttak
                    ? samtidigUttakProsentIsMax100(stillingsprosent)
                    : stillingsprosentIsLessThan100(stillingsprosent),
            failText: intl ? intlUtils(intl, `${intlKey}.over100prosent`) : '',
        },
    ];
};
