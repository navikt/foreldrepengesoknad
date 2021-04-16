import moment from 'moment';
import getMessage from 'common/util/i18nUtils';
import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import { date1YearAgo, attenUkerPluss3Number, today } from './values';
import { dateIsNotInFutureRule, erGyldigDato, hasValueRule } from './common';
import { DateValue } from '../../types/common';
import { Avgrensninger } from 'common/types';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

export const getTerminbekreftelsedatoAvgrensninger = (termindato?: Date): Avgrensninger => ({
    minDato: termindato
        ? moment(termindato)
              .subtract((attenUkerPluss3Number - 1) * 24, 'hours')
              .toDate()
        : date1YearAgo.toDate(),
    maksDato: today.toDate(),
});

export const getTerminbekreftelseDatoRegler = (
    terminbekreftelseDato: string | undefined,
    termindato: DateValue,
    intl: IntlShape
): Validator[] => {
    const intlKey = 'valideringsfeil.terminbekreftelseDato';
    const terminbekreftelsedatoM = moment(terminbekreftelseDato);
    const termindatoM = moment(termindato);

    return [
        hasValueRule(terminbekreftelseDato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        erGyldigDato(terminbekreftelseDato, getMessage(intl, `${intlKey}.gyldigDato`)),
        dateIsNotInFutureRule(ISOStringToDate(terminbekreftelseDato), getMessage(intl, `${intlKey}.forSen`)),
        {
            test: () =>
                moment
                    .max(termindatoM.subtract((attenUkerPluss3Number - 1) * 24, 'hours'), terminbekreftelsedatoM)
                    .isSame(terminbekreftelsedatoM, 'day'),
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke22`),
        },
    ];
};
