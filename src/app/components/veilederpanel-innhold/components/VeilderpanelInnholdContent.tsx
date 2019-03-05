import * as React from 'react';
import { Message } from '../VeilederpanelInnhold';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import './veilederpanelInnholdContent.less';
import { Element } from 'nav-frontend-typografi';

interface VeilederpanelInnholdContentProps {
    message: Message;
}

const renderAlert = (message: Message) => {
    const { type } = message;

    if (type === 'info') {
        return (
            <AlertStripeInfo>
                <Element>
                    <FormattedMessage id={message.title!} />
                </Element>
                <FormattedMessage id={message.content} values={message.values} />
            </AlertStripeInfo>
        );
    } else {
        return (
            <AlertStripeAdvarsel>
                <Element>
                    <FormattedMessage id={message.title!} />
                </Element>
                <FormattedMessage id={message.content} values={message.values} />
            </AlertStripeAdvarsel>
        );
    }
};

const VeilederpanelInnholdContent: React.SFC<VeilederpanelInnholdContentProps> = ({ message }) => {
    const bem = BEMHelper('veilederpanelInnholdContent');

    return (
        <div className={bem.className}>
            {message.title !== undefined && message.type !== 'normal' ? (
                renderAlert(message)
            ) : (
                <FormattedMessage id={message.content} values={message.values} />
            )}
        </div>
    );
};

export default VeilederpanelInnholdContent;
