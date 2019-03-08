import * as React from 'react';
import VeilederpanelInnholdContent from './components/VeilderpanelInnholdContent';

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

const VeilederpanelInnhold: React.SFC<VeilederpanelInnholdProps> = ({ messages }) => {
    return (
        <>
            {messages.map((message: Message, index: number) => (
                <VeilederpanelInnholdContent key={message.contentIntlKey + index} message={message} />
            ))}
        </>
    );
};

export default VeilederpanelInnhold;
