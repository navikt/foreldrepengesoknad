import * as React from 'react';
import VeilederpanelInnholdContent from './components/VeilderpanelInnholdContent';

type VeilederMessageType = 'normal' | 'info' | 'feil';

export interface Message {
    content: string;
    type: VeilederMessageType;
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
                <VeilederpanelInnholdContent key={message.content + index} message={message} />
            ))}
        </>
    );
};

export default VeilederpanelInnhold;
