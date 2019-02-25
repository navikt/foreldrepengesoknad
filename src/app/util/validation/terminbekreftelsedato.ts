import moment from 'moment';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import { date1YearAgo, fjortenUkerPluss3Number, today } from './values';
import { dateIsNotInFutureRule, hasValueRule } from './common';
import { DateValue } from '../../types/common';
import { Avgrensninger } from 'common/types';

export const fjortenUkerPluss3 = 14 * 7 + 3;

export const getTerminbekreftelsedatoAvgrensninger = (termindato?: Date): Avgrensninger => ({
    minDato: termindato
        ? moment(termindato)
              .subtract(fjortenUkerPluss3 * 24, 'hours')
              .toDate()
        : date1YearAgo.toDate(),
    maksDato: today.toDate()
});

export const getTerminbekreftelseDatoRegler = (
    terminbekreftelseDato: DateValue,
    termindato: DateValue,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.terminbekreftelseDato';
    const terminbekreftelsedatoM = moment(terminbekreftelseDato);
    const termindatoM = moment(termindato);

    return [
        hasValueRule(terminbekreftelseDato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(terminbekreftelseDato, getMessage(intl, `${intlKey}.forSen`)),
        {
            test: () =>
                moment
                    .max(termindatoM.subtract(fjortenUkerPluss3Number * 24, 'hours'), terminbekreftelsedatoM)
                    .isSame(terminbekreftelsedatoM, 'day'),
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke26`)
        }
    ];
};
