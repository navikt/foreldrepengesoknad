import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { date21DaysAgo, attenUkerPluss3, attenUkerPluss3Number, today, date3YearsAgo } from './values';
import { hasValueRule } from './common';
import { DateValue } from '../../types/common';
import { Avgrensninger } from 'common/types';

export const termindatoAvgrensninger: Avgrensninger = {
    minDato: date21DaysAgo.toDate(),
    maksDato: attenUkerPluss3.subtract(24, 'hours').toDate()
};

export const termindatoAvgrensningerFodsel: Avgrensninger = {
    minDato: date3YearsAgo.toDate(),
    maksDato: attenUkerPluss3.subtract(24, 'hours').toDate()
};

export const getTermindatoRegler = (dato: DateValue, intl: InjectedIntl): Validator[] => {
    const intlKey = 'valideringsfeil.termindato';
    const termindato = dato ? dato.toISOString() : undefined;

    return [
        hasValueRule(dato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        {
            test: () => {
                const wrappedTermindato = moment(termindato);
                return moment.max(wrappedTermindato, date21DaysAgo).isSame(wrappedTermindato, 'day');
            },
            failText: getMessage(intl, `${intlKey}.forTidlig`)
        },
        {
            test: () => {
                const uke22 = moment(termindato).subtract((attenUkerPluss3Number - 1) * 24, 'hours');
                return moment.max(today, uke22).isSame(today, 'day');
            },
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke22`)
        }
    ];
};
