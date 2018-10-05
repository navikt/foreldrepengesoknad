import { InjectedIntl } from 'react-intl';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types/index';
import { DateValue } from '../../../types/common';
import getMessage from 'common/util/i18nUtils';
import { date3YearsAgo } from '../values';
import { dateIs3YearsAgoOrLater, dateIsNotInFutureRule, notInFutureAvgrensning, valueIsDefinedRule } from './common';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: date3YearsAgo.toDate(),
    ...notInFutureAvgrensning
};

export const getFødselsdatoRegler = (fødselsdato: DateValue, intl: InjectedIntl): Validator[] => {
    const intlKey = 'valideringsfeil.fodselsdato';
    return [
        valueIsDefinedRule(fødselsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(fødselsdato, getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`)),
        dateIs3YearsAgoOrLater(fødselsdato, getMessage(intl, `${intlKey}.ikkeMerEnn3ÅrTilbake`))
    ];
};

export const fødselsdatoerErFyltUt = (fødselsdatoer: Date[] | undefined): boolean =>
    fødselsdatoer !== undefined && fødselsdatoer.length > 0 && fødselsdatoer.findIndex((d) => d === undefined) === -1;
