import { ReactNode, useState } from 'react';
import { Accordion, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';

import './oppsummeringspunkt.css';

interface Props {
    tittel: string;
    hide?: boolean;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, hide = false, children }: Props) => {
    const [isOpen, toggleOpen] = useState(false);

    if (hide) {
        return null;
    }

    return (
        <Accordion.Item>
            <Accordion.Header
                className={isOpen ? bemUtils('accordian_header').block : undefined}
                onClick={() => toggleOpen((open) => !open)}
            >
                <Heading level="3" size="small">
                    {tittel}
                </Heading>
            </Accordion.Header>
            <Accordion.Content>
                <div className={bemUtils('content_margin').block}>{children}</div>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default Oppsummeringspunkt;
