import { FunctionComponent, ReactNode } from 'react';

import { Label } from '@navikt/ds-react';

interface Props {
    title: string;
    children?: ReactNode;
}

const OppsummeringsPunkt: FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div>
            <Label>{title}</Label>
            {children}
        </div>
    );
};

export default OppsummeringsPunkt;
