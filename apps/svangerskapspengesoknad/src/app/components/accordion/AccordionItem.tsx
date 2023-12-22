import { bemUtils } from '@navikt/fp-common';
import { FunctionComponent, useCallback, useState, ReactNode } from 'react';
import { Accordion, Heading } from '@navikt/ds-react';

import '../accordion/accordion.css';

interface Props {
    title: string;
    children: ReactNode;
}

const AccordionContent: FunctionComponent<Props> = ({ title, children }) => {
    const bem = bemUtils('accordion');

    const [isOpen, toggleOpen] = useState(false);
    const toggle = useCallback(() => toggleOpen((open) => !open), []);

    return (
        <Accordion.Item className={bem.element('specificity')}>
            <Accordion.Header className={isOpen ? 'accordion_headerOpen' : 'accordion_header'} onClick={toggle}>
                <Heading level="3" size="small">
                    {title}
                </Heading>
            </Accordion.Header>
            <Accordion.Content>{children}</Accordion.Content>
        </Accordion.Item>
    );
};

export default AccordionContent;
