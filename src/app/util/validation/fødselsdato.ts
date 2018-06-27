import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';
import { Fødselsdato } from '../../types/common';
import getMessage from 'common/util/i18nUtils';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: moment()
        .subtract(3, 'years')
        .startOf('day')
        .toDate(),
    maksDato: moment()
        .endOf('day')
        .toDate()
};

export const getFødselsdatoRegler = (
    fødselsdato: Fødselsdato,
    intl: InjectedIntl
): Validator[] => {
    const date = moment(fødselsdato);
    const tomorrow = moment().add(1, 'days');
    const date3YearsAgo = moment()
        .subtract(3, 'years')
        .startOf('day');

    return [
        {
            test: () => fødselsdato !== undefined,
            failText: getMessage(intl, 'valideringsfeil.fodselsdato.duMåOppgi')
        },
        {
            test: () => date.isBefore(tomorrow),
            failText: getMessage(
                intl,
                'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere'
            )
        },
        {
            test: () => date.isSameOrAfter(date3YearsAgo),
            failText: getMessage(
                intl,
                'valideringsfeil.fodselsdato.ikkeMerEnn3ÅrTilbake'
            )
        }
    ];
};
