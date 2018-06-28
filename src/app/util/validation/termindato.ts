import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import {
    date21DaysAgo,
    fjortenUkerPluss3,
    fjortenUkerPluss3Number,
    today
} from './values';

export const termindatoAvgrensninger: Avgrensninger = {
    minDato: date21DaysAgo.toDate(),
    maksDato: fjortenUkerPluss3.toDate()
};

export const getTermindatoRegler = (
    dato: Date | undefined,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.termindato';
    const termindato = moment(dato);

    return [
        {
            test: () => dato !== undefined,
            failText: getMessage(intl, `${intlKey}.duMåOppgi`)
        },
        {
            test: () => moment.max(termindato, date21DaysAgo) === termindato,
            failText: getMessage(intl, `${intlKey}.forTidlig`)
        },
        {
            test: () => {
                const uke26pluss3 = termindato
                    .subtract(fjortenUkerPluss3Number, 'days')
                    .startOf('day');
                return moment.max(today, uke26pluss3) === today;
            },
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke26`)
        }
    ];
};
