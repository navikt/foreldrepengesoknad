import { FunctionComponent, ReactNode, useState } from 'react';
import { bemUtils } from '@navikt/fp-common';
import { Accordion, Heading } from '@navikt/ds-react';

import './oppsummeringsPanel.less';

interface Props {
    title: string;
    children: ReactNode;
}

const OppsummeringsPanel: FunctionComponent<Props> = ({ title, children }) => {
    const [isOpen, toggleOpen] = useState(false);

    return (
        <Accordion.Item>
            <Accordion.Header
                className={isOpen ? bemUtils('accordian_header').block : undefined}
                onClick={() => toggleOpen((open) => !open)}
            >
                <Heading level="3" size="small">
                    {title}
                </Heading>
            </Accordion.Header>
            <Accordion.Content>
                <div className={bemUtils('content_margin').block}>{children}</div>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default OppsummeringsPanel;
