import { InjectedIntl } from 'react-intl';
import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types/index';
import { DateValue } from '../../types/common';
import getMessage from 'common/util/i18nUtils';
import { date3YearsAgo, date15YearsAnd3MonthsAgo } from './values';
import {
    dateIs3YearsAgoOrLaterRule,
    dateIsNotInFutureRule,
    notInFutureAvgrensning,
    hasValueRule,
    dateIs15YearsAnd3MonthsAgoOrLaterRule
} from './common';
import { formaterDatoUtenDag } from 'common/util/datoUtils';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: date3YearsAgo.toDate(),
    ...notInFutureAvgrensning
};

export const getFødselsdatoRegler = (
    fødselsdato: DateValue,
    gjelderAdopsjon: boolean,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.fodselsdato';
    const regler = [
        hasValueRule(fødselsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(fødselsdato, getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`))
    ];
    if (gjelderAdopsjon) {
        regler.push(
            dateIs15YearsAnd3MonthsAgoOrLaterRule(
                fødselsdato,
                getMessage(intl, `${intlKey}.ikkeMerEnn15År3MndTilbake`, {
                    dato: formaterDatoUtenDag(date15YearsAnd3MonthsAgo.toDate())
                })
            )
        );
    } else {
        regler.push(dateIs3YearsAgoOrLaterRule(fødselsdato, getMessage(intl, `${intlKey}.ikkeMerEnn3ÅrTilbake`)));
    }
    return regler;
};

export const fødselsdatoerErFyltUt = (fødselsdatoer: Date[] | undefined): boolean =>
    fødselsdatoer !== undefined && fødselsdatoer.length > 0 && fødselsdatoer.findIndex((d) => d === undefined) === -1;

export const fødselsdatoErFørEllerLikAdopsjonsdato = (
    fødselsdatoer: Date[] | undefined,
    adopsjonsdato: Date
): boolean => {
    if (fødselsdatoer !== undefined && fødselsdatoer.length > 0) {
        return moment(fødselsdatoer[0]).isSameOrBefore(adopsjonsdato, 'day');
    }
    return false;
};
