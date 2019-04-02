import * as React from 'react';
import { VeilederMessage } from '../VeilederInfo';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';

import './veilederMelding.less';

interface VeilederpanelInnholdContentProps {
    message: VeilederMessage;
}

const getAlertStripeTypeFromMessageType = (message: VeilederMessage): AlertStripeType => {
    switch (message.type) {
        case 'normal':
        case 'info':
            return 'info';
        case 'advarsel':
            return 'advarsel';
        case 'feil':
            return 'feil';
    }
};

const renderAlert = (message: VeilederMessage, FormatComponent: any) => {
    return (
        <AlertStripe type={getAlertStripeTypeFromMessageType(message)}>
            {message.titleIntlKey !== undefined && (
                <Element>
                    <FormatComponent id={message.titleIntlKey!} />
                </Element>
            )}
            <FormatComponent id={message.contentIntlKey} values={message.values} />
        </AlertStripe>
    );
};

const VeilederMelding: React.SFC<VeilederpanelInnholdContentProps> = ({ message }) => {
    const bem = BEMHelper('veilederMelding');
    const FormatComponent = message.formatContentAsHTML === true ? FormattedHTMLMessage : FormattedMessage;
    return (
        <div className={bem.className}>
            {message.type !== 'normal' ? (
                renderAlert(message, FormatComponent)
            ) : (
                <FormatComponent id={message.contentIntlKey} values={message.values} />
            )}
        </div>
    );
};

export default VeilederMelding;
