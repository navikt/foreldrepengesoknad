import { ReactNode } from 'react';
import { Accordion, Heading } from '@navikt/ds-react';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => (
    <Accordion.Item>
        <Accordion.Header>
            <Heading level="2" size="small">
                {tittel}
            </Heading>
        </Accordion.Header>
        <Accordion.Content>{children}</Accordion.Content>
    </Accordion.Item>
);

export default Oppsummeringspunkt;
