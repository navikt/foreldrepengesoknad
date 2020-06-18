import * as React from 'react';
import { VeilederMessage } from '../types';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';

import './veilederMelding.less';

export type VeilederMeldingStil = 'transparent' | 'default';

interface VeilederpanelInnholdContentProps {
    message: VeilederMessage;
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
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

const renderAlert = (message: VeilederMessage, skjulMeldingIkon: boolean) => {
    const content = (
        <>
            {message.titleIntlKey !== undefined && (
                <Element>
                    <FormattedMessage id={message.titleIntlKey!} />
                </Element>
            )}
            <FormattedMessage id={message.contentIntlKey} values={message.values} />
        </>
    );
    return skjulMeldingIkon ? (
        <div>{content}</div>
    ) : (
        <AlertStripe type={getAlertStripeTypeFromMessageType(message)}>{content}</AlertStripe>
    );
};

const VeilederMelding: React.SFC<VeilederpanelInnholdContentProps> = ({
    message,
    stil = 'default',
    skjulMeldingIkon = false,
}) => {
    const bem = BEMHelper('veilederMelding');
    return (
        <div className={bem.classNames(bem.block, bem.modifier(stil))}>
            {message.type !== 'normal' ? (
                renderAlert(message, skjulMeldingIkon)
            ) : (
                <FormattedMessage id={message.contentIntlKey} values={message.values} />
            )}
        </div>
    );
};

export default VeilederMelding;
