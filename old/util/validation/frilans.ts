import { IntlShape } from 'react-intl';
import { dateIsNotInFutureRule, erGyldigDato, hasValueRule } from './common';
import getMessage from 'common/util/i18nUtils';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

export const getFrilansOppstartRules = (oppstartsdato: string | undefined, intl: IntlShape) => {
    const intlKey = 'valideringsfeil.frilansOppstart';

    return [
        hasValueRule(oppstartsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        erGyldigDato(oppstartsdato, getMessage(intl, `${intlKey}.gyldigDato`)),
        dateIsNotInFutureRule(ISOStringToDate(oppstartsdato), getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`)),
    ];
};
