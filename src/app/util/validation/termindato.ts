import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { date21DaysAgo, fjortenUkerPluss3, fjortenUkerPluss3Number, today } from './values';
import { hasValueRule } from './common';
import { DateValue } from '../../types/common';
import { Avgrensninger } from 'common/types';

export const termindatoAvgrensninger: Avgrensninger = {
    minDato: date21DaysAgo.toDate(),
    maksDato: fjortenUkerPluss3.toDate()
};

export const getTermindatoRegler = (dato: DateValue, intl: InjectedIntl): Validator[] => {
    const intlKey = 'valideringsfeil.termindato';
    const termindato = moment(dato);

    return [
        hasValueRule(dato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        {
            test: () => moment.max(termindato, date21DaysAgo) === termindato,
            failText: getMessage(intl, `${intlKey}.forTidlig`)
        },
        {
            test: () => {
                const uke26pluss3 = termindato.subtract(fjortenUkerPluss3Number * 24, 'hours');
                return moment.max(today, uke26pluss3).isSame(today, 'day');
            },
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke26`)
        }
    ];
};
