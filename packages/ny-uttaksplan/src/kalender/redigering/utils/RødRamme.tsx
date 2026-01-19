import { ReactNode } from 'react';

import { Box } from '@navikt/ds-react';

export const RødRamme = ({ children }: { children: ReactNode }) => (
    <Box background="danger-strong" borderRadius="8" className={'text-ax-bg-default px-2'}>
        {children}
    </Box>
);
