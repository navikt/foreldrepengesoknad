import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import { DateValue } from '../../types/common';
import getMessage from 'common/util/i18nUtils';
import { date3YearsAgo, date15YearsAnd3MonthsAgo } from './values';
import {
    dateIs15YearsAnd3MonthsAgoOrLaterRule,
    dateIs3YearsAgoOrLaterRule,
    dateIsNotInFutureRule,
    notInFutureAvgrensning,
    hasValueRule,
} from './common';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { Avgrensninger } from 'common/types';
import { isISODateString } from 'nav-datovelger';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: date3YearsAgo.toDate(),
    ...notInFutureAvgrensning,
};

export const getFødselsdatoRegler = (
    fødselsdato: DateValue,
    gjelderAdopsjon: boolean,
    intl: IntlShape
): Validator[] => {
    const intlKey = 'valideringsfeil.fodselsdato';
    const regler = [
        hasValueRule(fødselsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(fødselsdato, getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`)),
    ];
    if (gjelderAdopsjon) {
        regler.push(
            dateIs15YearsAnd3MonthsAgoOrLaterRule(
                fødselsdato,
                getMessage(intl, `${intlKey}.ikkeMerEnn15År3MndTilbake`, {
                    dato: formaterDatoUtenDag(date15YearsAnd3MonthsAgo.toDate()),
                })
            )
        );
    } else {
        regler.push(dateIs3YearsAgoOrLaterRule(fødselsdato, getMessage(intl, `${intlKey}.ikkeMerEnn3ÅrTilbake`)));
    }
    return regler;
};

export const fødselsdatoerErFyltUt = (fødselsdatoer: string[] | undefined): boolean =>
    fødselsdatoer !== undefined &&
    fødselsdatoer.length > 0 &&
    fødselsdatoer.findIndex((d) => isISODateString(d) === false) === -1;
