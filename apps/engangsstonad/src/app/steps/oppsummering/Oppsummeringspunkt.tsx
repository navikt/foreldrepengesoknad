import React, { ReactNode } from 'react';
import { Block } from '@navikt/fp-common';
import { Accordion, Heading } from '@navikt/ds-react';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => (
    <Block margin="xl">
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <Heading size="small">{tittel}</Heading>
                </Accordion.Header>
                <Accordion.Content>
                    {children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    </Block>
);

export default Oppsummeringspunkt;
