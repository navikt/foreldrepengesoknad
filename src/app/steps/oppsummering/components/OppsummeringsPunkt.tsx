import { Block } from '@navikt/fp-common';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
    title: string;
    visible?: boolean;
    children?: ReactNode;
}

const OppsummeringsPunkt: FunctionComponent<Props> = ({ title, visible, children }) => {
    return (
        <Block padBottom="l" visible={visible}>
            <Element>{title}</Element>
            {children}
        </Block>
    );
};

export default OppsummeringsPunkt;
