import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';
import { Fødselsdato } from '../../types/common';
import getMessage from 'common/util/i18nUtils';
import { date3YearsAgo, today, tomorrow } from './values';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: date3YearsAgo.toDate(),
    maksDato: today.toDate()
};

export const getFødselsdatoRegler = (
    fødselsdato: Fødselsdato,
    intl: InjectedIntl
): Validator[] => {
    const date = moment(fødselsdato);
    const intlKey = 'valideringsfeil.fodselsdato';

    return [
        {
            test: () => fødselsdato !== undefined,
            failText: getMessage(intl, `${intlKey}.duMåOppgi`)
        },
        {
            test: () => date.isBefore(tomorrow),
            failText: getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`)
        },
        {
            test: () => date.isSameOrAfter(date3YearsAgo),
            failText: getMessage(intl, `${intlKey}.ikkeMerEnn3ÅrTilbake`)
        }
    ];
};
