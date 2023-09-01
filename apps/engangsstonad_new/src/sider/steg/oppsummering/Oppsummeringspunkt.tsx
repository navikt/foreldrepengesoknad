import { ReactNode } from 'react';
import { Block } from '@navikt/fp-common';
import { Accordion, Heading } from '@navikt/ds-react';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => (
    <Block>
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <Heading level="2" size="small">
                        {tittel}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    </Block>
);

export default Oppsummeringspunkt;
