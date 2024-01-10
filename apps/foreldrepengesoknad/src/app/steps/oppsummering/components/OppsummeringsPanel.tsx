import { FunctionComponent, ReactNode } from 'react';
import { bemUtils } from '@navikt/fp-common';
import { Accordion, Heading } from '@navikt/ds-react';

import './oppsummeringsPanel.less';

interface Props {
    title: string;
    children: ReactNode;
}

const OppsummeringsPanel: FunctionComponent<Props> = ({ title, children }) => {
    const bem = bemUtils('oppsummeringsPanel');

    return (
        <Accordion>
            <Accordion.Item className={bem.element('specificity')}>
                <Accordion.Header>
                    <Heading level="3" size="small">
                        {title}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default OppsummeringsPanel;