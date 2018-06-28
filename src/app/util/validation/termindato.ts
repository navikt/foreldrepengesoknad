import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';

export const fjortenUkerPluss3 = 14 * 7 + 3;

export const termindatoAvgrensninger: Avgrensninger = {
    minDato: moment()
        .subtract(21, 'days')
        .startOf('day')
        .toDate(),
    maksDato: moment()
        .add(fjortenUkerPluss3, 'days')
        .endOf('day')
        .toDate()
};

const today = moment().startOf('day');
const date3WeeksAgo = moment()
    .subtract(21, 'days')
    .startOf('day');

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
            test: () => moment.max(termindato, date3WeeksAgo) === termindato,
            failText: getMessage(intl, `${intlKey}.termindatoForTidlig`)
        },
        {
            test: () => {
                const uke26pluss3 = termindato
                    .subtract(fjortenUkerPluss3, 'days')
                    .startOf('day');
                return moment.max(today, uke26pluss3) === today;
            },
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke26`)
        }
    ];
};
