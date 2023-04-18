import React from 'react';
import { VeilederMessage } from '../types';
import { FormattedMessage } from 'react-intl';
import { bemUtils } from '@navikt/fp-common';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplan-ikon/UttaksplanIkon';
import { Alert, Label } from '@navikt/ds-react';

import './veilederMelding.less';

export type VeilederMeldingStil = 'transparent' | 'default';

interface VeilederpanelInnholdContentProps {
    message: VeilederMessage;
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}

type AlertType = 'error' | 'warning' | 'info' | 'success';

const getAlertStripeTypeFromMessageType = (message: VeilederMessage): AlertType => {
    switch (message.type) {
        case 'normal':
        case 'info':
            return 'info';
        case 'advarsel':
            return 'warning';
        case 'feil':
            return 'error';
    }
};

export const getIkonForVeilederMelding = (melding: VeilederMessage): UttaksplanIkonKeys => {
    switch (melding.type) {
        case 'feil':
            return UttaksplanIkonKeys.feil;
        case 'advarsel':
            return UttaksplanIkonKeys.advarsel;
        default:
            return UttaksplanIkonKeys.info;
    }
};

const renderAlert = (message: VeilederMessage, skjulMeldingIkon: boolean) => {
    const content = (
        <>
            {message.titleIntlKey !== undefined && (
                <Label as="div">
                    <FormattedMessage id={message.titleIntlKey} />
                </Label>
            )}
            <FormattedMessage id={message.contentIntlKey} values={message.values} />
        </>
    );
    return skjulMeldingIkon ? (
        <div>{content}</div>
    ) : (
        <Alert variant={getAlertStripeTypeFromMessageType(message)} inline>
            {content}
        </Alert>
    );
};

const VeilederMelding: React.FunctionComponent<VeilederpanelInnholdContentProps> = ({
    message,
    stil = 'default',
    skjulMeldingIkon = false,
}) => {
    const bem = bemUtils('veilederMelding');
    return (
        <div className={bem.classNames(bem.block, bem.modifier(stil))}>
            {message.type !== 'normal' ? (
                renderAlert(message, skjulMeldingIkon)
            ) : (
                <div className="veilederMelding__padding">
                    <FormattedMessage id={message.contentIntlKey} values={message.values} />
                </div>
            )}
        </div>
    );
};

export default VeilederMelding;
