import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import {
    samtidigUttakProsentIsMax100,
    stillingsprosentIsLessThan100,
    stillingsprosentIsMoreThan0,
} from '../../utils/periodeUtils';
import { hasValueRule } from './regelUtils';
import { Validator } from './types/validatorTypes';

export const getStillingsprosentRegler = (
    erSamtidigUttak: boolean,
    stillingsprosent: string,
    intl?: IntlShape,
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        hasValueRule(stillingsprosent, intl ? intl.formatMessage({ id: `${intlKey}.required` }) : ''),
        {
            test: () => getFloatFromString(stillingsprosent) !== undefined,
            failText: intl ? intl.formatMessage({ id: `${intlKey}.ugyldigTall` }) : '',
        },
        {
            test: () => stillingsprosentIsMoreThan0(stillingsprosent),
            failText: intl ? intl.formatMessage({ id: `${intlKey}.under1` }) : '',
        },
        {
            test: () =>
                erSamtidigUttak
                    ? samtidigUttakProsentIsMax100(stillingsprosent)
                    : stillingsprosentIsLessThan100(stillingsprosent),
            failText: intl ? intl.formatMessage({ id: `${intlKey}.over100prosent` }) : '',
        },
    ];
};
