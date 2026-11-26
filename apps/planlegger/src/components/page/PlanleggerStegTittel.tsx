import { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { Heading } from '@navikt/ds-react';

import { useFokusVedNavigasjon } from '@navikt/fp-ui';

interface Props {
    children: ReactNode;
    spacing?: boolean;
}

export const PlanleggerStegTittel = ({ children, spacing }: Props) => {
    const { pathname } = useLocation();
    const overskriftRef = useFokusVedNavigasjon<HTMLHeadingElement>(pathname);
    return (
        <Heading ref={overskriftRef} level="2" size="medium" spacing={spacing}>
            {children}
        </Heading>
    );
};
