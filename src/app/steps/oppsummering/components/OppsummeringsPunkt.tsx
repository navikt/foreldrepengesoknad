import { Block } from '@navikt/fp-common';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
    title: string;
    text?: string;
    visible?: boolean;
    children?: ReactNode;
}

const OppsummeringsPunkt: FunctionComponent<Props> = ({ title, text, visible, children }) => {
    return (
        <Block padBottom="l" visible={visible}>
            <Element>{title}</Element>
            {text !== undefined && <Normaltekst>{text}</Normaltekst>}
            {children}
        </Block>
    );
};

export default OppsummeringsPunkt;
