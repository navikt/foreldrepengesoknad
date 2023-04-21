import React, { FunctionComponent, ReactNode } from 'react';
import { bemUtils } from '@navikt/fp-common';
import { Accordion } from '@navikt/ds-react';

import './oppsummeringsPanel.less';

interface Props {
    title: string;
    children: ReactNode;
}

const OppsummeringsPanel: FunctionComponent<Props> = ({ title, children }) => {
    const bem = bemUtils('oppsummeringsPanel');

    return (
        <Accordion className={bem.block}>
            <Accordion.Item>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default OppsummeringsPanel;
