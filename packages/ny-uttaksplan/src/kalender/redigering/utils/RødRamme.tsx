import { ReactNode } from 'react';

import { Box } from '@navikt/ds-react';

export const RødRamme = ({ children }: { children: ReactNode }) => (
    <Box.New background="danger-strong" borderRadius="large" className={'text-ax-bg-default px-2'}>
        {children}
    </Box.New>
);
