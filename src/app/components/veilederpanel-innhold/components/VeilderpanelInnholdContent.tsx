import * as React from 'react';
import { Message } from '../VeilederpanelInnhold';
import { injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import './veilederpanelInnholdContent.less';
import { Element } from 'nav-frontend-typografi';

interface VeilederpanelInnholdContentProps {
    message: Message;
    intl: InjectedIntl;
}

const renderAlert = (message: Message, intl: InjectedIntl) => {
    const { type } = message;

    if (type === 'info') {
        return (
            <AlertStripeInfo>
                <Element>{message.title}</Element>
                {getMessage(intl, message.content)}
            </AlertStripeInfo>
        );
    } else {
        return (
            <AlertStripeAdvarsel>
                <Element>{message.title}</Element>
                {getMessage(intl, message.content)}
            </AlertStripeAdvarsel>
        );
    }
};

const VeilederpanelInnholdContent: React.SFC<VeilederpanelInnholdContentProps> = ({ message, intl }) => {
    const bem = BEMHelper('veilederpanelInnholdContent');

    return (
        <div className={bem.className}>
            {message.title !== undefined && message.type !== 'normal'
                ? renderAlert(message, intl)
                : getMessage(intl, message.content)}
        </div>
    );
};

export default injectIntl(VeilederpanelInnholdContent);
