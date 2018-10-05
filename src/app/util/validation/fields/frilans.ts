import { InjectedIntl } from 'react-intl';
import { dateIsNotInFutureRule, valueIsDefinedRule } from './common';
import getMessage from 'common/util/i18nUtils';
import { DateValue } from '../../../types/common';

export const getFrilansOppstartRules = (oppstartsdato: DateValue, intl: InjectedIntl) => {
    const intlKey = 'valideringsfeil.frilansOppstart';
    return [
        valueIsDefinedRule(oppstartsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(oppstartsdato, getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`))
    ];
};
