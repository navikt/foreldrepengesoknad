import * as React from 'react';
import VeilederMelding from './components/VeilederMelding';
import Veileder, { VeilederAnsiktstype, VeilederStil } from 'common/components/veileder/Veileder';
import Veilederpanel from 'nav-frontend-veilederpanel';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';

export type VeilederMessageType = 'normal' | 'info' | 'advarsel' | 'feil';

export interface VeilederMessage {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    titleIntlKey?: string;
    values?: any;
}

interface Props {
    messages: VeilederMessage[];
    paneltype?: 'normal' | 'plakat';
    kompakt?: boolean;
    veilederStil?: VeilederStil;
    ariaTittel?: string;
}

const VeilederInfo: React.SFC<Props> = ({
    messages,
    kompakt = true,
    paneltype = 'normal',
    veilederStil = 'kompakt',
    ariaTittel
}) => {
    const harFeil = messages.some((m) => m.type === 'feil');
    const harAdvarsler = messages.some((m) => m.type === 'advarsel');

    let ansikt: VeilederAnsiktstype;
    if (harFeil) {
        ansikt = 'skeptisk';
    } else if (harAdvarsler) {
        ansikt = 'undrende';
    } else {
        ansikt = 'glad';
    }

    return (
        <Veilederpanel
            type={paneltype}
            kompakt={kompakt}
            svg={<Veileder stil={veilederStil} ansikt={ansikt} farge="transparent" />}
            fargetema={harFeil ? 'feilmelding' : 'normal'}>
            {ariaTittel && (
                <AriaText tag="h2">
                    <FormattedMessage id="uttaksplan.regelAvvik.ariaTittel" />
                </AriaText>
            )}
            {messages.map((message: VeilederMessage, index: number) => (
                <VeilederMelding key={message.contentIntlKey + index} message={message} />
            ))}
        </Veilederpanel>
    );
};

export default VeilederInfo;
