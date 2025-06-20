import { FormattedMessage } from 'react-intl';

import { Alert, Label } from '@navikt/ds-react';

import { UttaksplanIkonKeys } from '../../../components/uttaksplan-ikon/UttaksplanIkon';
import planBemUtils from '../../../utils/planBemUtils';
import { VeilederMessage } from '../types';
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

const renderAlert = (message: VeilederMessage, skjulMeldingIkon: boolean, stil: VeilederMeldingStil) => {
    const content = (
        <>
            {message.titleIntlKey !== undefined && (
                <Label as="div">
                    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart */}
                    <FormattedMessage id={message.titleIntlKey} />
                </Label>
            )}
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart */}
            <FormattedMessage id={message.contentIntlKey} values={message.values} />
        </>
    );
    return skjulMeldingIkon ? (
        <div>{content}</div>
    ) : (
        <Alert variant={getAlertStripeTypeFromMessageType(message)} inline={stil === 'transparent'}>
            {content}
        </Alert>
    );
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const VeilederMelding: React.FunctionComponent<VeilederpanelInnholdContentProps> = ({
    message,
    stil = 'default',
    skjulMeldingIkon = false,
}) => {
    const bem = planBemUtils('veilederMelding');
    return (
        <div className={bem.classNames(bem.block, bem.modifier(stil))}>
            {message.type !== 'normal' ? (
                renderAlert(message, skjulMeldingIkon, stil)
            ) : (
                <div className="veilederMelding__padding">
                    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart */}
                    <FormattedMessage id={message.contentIntlKey} values={message.values} />
                </div>
            )}
        </div>
    );
};
// eslint-disable-next-line import/no-default-export
export default VeilederMelding;
