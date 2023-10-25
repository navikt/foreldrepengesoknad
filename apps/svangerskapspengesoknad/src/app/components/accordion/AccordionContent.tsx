import { Block } from '@navikt/fp-common';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
    visible?: boolean;
    children?: ReactNode;
}

const Accordion: FunctionComponent<Props> = ({ visible, children }) => {
    return (
        <Block padBottom="l" visible={visible}>
            {children}
        </Block>
    );
};

export default Accordion;
