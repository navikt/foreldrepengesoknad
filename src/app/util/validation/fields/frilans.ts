import { InjectedIntl } from 'react-intl';
import { dateIsNotInFutureRule, valueIsDefinedRule } from './common';
import getMessage from 'common/util/i18nUtils';

export const getFrilansOppstartRules = (oppstartsdato: Date | undefined, intl: InjectedIntl) => {
    const intlKey = 'valideringsfeil.frilansOppstart';

    return [
        valueIsDefinedRule(oppstartsdato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        dateIsNotInFutureRule(oppstartsdato, getMessage(intl, `${intlKey}.måVæreIdagEllerTidligere`))
    ];
};
