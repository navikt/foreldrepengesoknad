import * as React from 'react';

interface MessageType {
    content: string;
    type: string;
}

interface VeilederpanelInnholdProps {
    messages: MessageType[];
}

const VeilederpanelInnhold: React.SFC<VeilederpanelInnholdProps> = () => {
    return <div>Hello world!</div>;
};

export default VeilederpanelInnhold;
