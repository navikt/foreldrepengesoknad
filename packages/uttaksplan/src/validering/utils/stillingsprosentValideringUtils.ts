import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import {
    samtidigUttakProsentIsMax100,
    stillingsprosentIsLessThan100,
    stillingsprosentIsMoreThan0,
} from '../../utils/periodeUtils';
import { hasValueRule } from './regelUtils';
import { Validator } from './types/validatorTypes';

const getMessage = (intl: IntlShape, messageKey: string) => {
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.formatMessage({ id: messageKey });
};

export const getStillingsprosentRegler = (
    erSamtidigUttak: boolean,
    stillingsprosent: string,
    intl?: IntlShape,
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
