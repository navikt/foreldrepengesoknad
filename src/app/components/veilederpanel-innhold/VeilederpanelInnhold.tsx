import * as React from 'react';
import VeilederpanelInnholdContent from './components/VeilderpanelInnholdContent';
import Veileder from 'common/components/veileder/Veileder';
import Veilederpanel from 'nav-frontend-veilederpanel';

type VeilederMessageType = 'normal' | 'info' | 'feil';

export interface Message {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    title?: string;
    values?: any;
}

interface VeilederpanelInnholdProps {
    messages: Message[];
}

const VeilederMeldinger: React.SFC<VeilederpanelInnholdProps> = ({ messages }) => {
    return (
        <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
            {messages.map((message: Message, index: number) => (
                <VeilederpanelInnholdContent key={message.contentIntlKey + index} message={message} />
            ))}
        </Veilederpanel>
    );
};

export default VeilederMeldinger;
