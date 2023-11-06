import { ReactNode, useCallback, useState } from 'react';
import { Accordion, Heading } from '@navikt/ds-react';

import './oppsummeringspunkt.css';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => {
    const [isOpen, toggleOpen] = useState(false);
    const toggle = useCallback(() => toggleOpen((open) => !open), []);

    return (
        <Accordion.Item>
            <Accordion.Header className={isOpen ? 'accordian_header' : undefined} onClick={toggle}>
                <Heading level="2" size="small">
                    {tittel}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="content_margin">{children}</Accordion.Content>
        </Accordion.Item>
    );
};

export default Oppsummeringspunkt;
