import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import {
    date1YearAgo,
    fjortenUkerPluss3Number,
    today,
    tomorrow
} from './values';

export const fjortenUkerPluss3 = 14 * 7 + 3;

export const getTerminbekreftelsedatoAvgrensninger = (
    termindato?: Date
): Avgrensninger => ({
    minDato: termindato
        ? moment(termindato)
              .subtract(fjortenUkerPluss3, 'days')
              .toDate()
        : date1YearAgo.toDate(),
    maksDato: today.toDate()
});

export const getTerminbekreftelseDatoRegler = (
    terminbekreftelseDato: Date | undefined,
    termindato: Date | undefined,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.terminbekreftelseDato';
    const terminbekreftelsedatoM = moment(terminbekreftelseDato).startOf('day');
    const termindatoM = moment(termindato).startOf('day');

    return [
        {
            test: () => terminbekreftelseDato !== undefined,
            failText: getMessage(intl, `${intlKey}.duMåOppgi`)
        },
        {
            test: () =>
                moment.max(terminbekreftelsedatoM, tomorrow) === tomorrow,
            failText: getMessage(intl, `${intlKey}.forSen`)
        },
        {
            test: () =>
                moment
                    .max(
                        termindatoM.subtract(fjortenUkerPluss3Number, 'days'),
                        terminbekreftelsedatoM
                    )
                    .isSame(terminbekreftelsedatoM),
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke26`)
        }
    ];
};
