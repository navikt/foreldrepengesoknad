import { Label } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
    title: string;
    visible?: boolean;
    children?: ReactNode;
}

const OppsummeringsPunkt: FunctionComponent<Props> = ({ title, visible, children }) => {
    return (
        <Block padBottom="l" visible={visible}>
            <Label>{title}</Label>
            {children}
        </Block>
    );
};

export default OppsummeringsPunkt;
