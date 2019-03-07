import * as React from 'react';
import { Message } from '../VeilederpanelInnhold';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import './veilederpanelInnholdContent.less';
import { Element } from 'nav-frontend-typografi';

interface VeilederpanelInnholdContentProps {
    message: Message;
}

const renderAlert = (message: Message, FormatComponent: any) => {
    const { type } = message;

    if (type === 'info') {
        return (
            <AlertStripeInfo>
                <Element>
                    <FormatComponent id={message.title!} />
                </Element>
                <FormatComponent id={message.contentIntlKey} values={message.values} />
            </AlertStripeInfo>
        );
    } else {
        return (
            <AlertStripeAdvarsel>
                <Element>
                    <FormatComponent id={message.title!} />
                </Element>
                <FormatComponent id={message.contentIntlKey} values={message.values} />
            </AlertStripeAdvarsel>
        );
    }
};

const VeilederpanelInnholdContent: React.SFC<VeilederpanelInnholdContentProps> = ({ message }) => {
    const bem = BEMHelper('veilederpanelInnholdContent');

    const FormatComponent = message.formatContentAsHTML === true ? FormattedHTMLMessage : FormattedMessage;

    return (
        <div className={bem.className}>
            {message.title !== undefined && message.type !== 'normal' ? (
                renderAlert(message, FormatComponent)
            ) : (
                <FormatComponent id={message.contentIntlKey} values={message.values} />
            )}
        </div>
    );
};

export default VeilederpanelInnholdContent;
