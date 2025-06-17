import { FormattedMessage } from 'react-intl';

import { Alert, Label } from '@navikt/ds-react';

import { VeilederMessage } from '../types';
import './veilederMelding.less';

export type VeilederMeldingStil = 'transparent' | 'default';

interface VeilederpanelInnholdContentProps {
    message: VeilederMessage;
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}

type AlertType = 'info' | 'warning' | 'error';

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

const VeilederMelding: React.FC<VeilederpanelInnholdContentProps> = ({ message, stil, skjulMeldingIkon }) => (
    <Alert variant={getAlertStripeTypeFromMessageType(message)}>
        <FormattedMessage id={message.contentIntlKey} values={message.values} />
    </Alert>
);

export default VeilederMelding;
