import { ReactNode } from 'react';

import { Box } from '@navikt/ds-react';

export const BlåRamme = ({ children }: { children: ReactNode }) => (
    <Box
        background="brand-blue-strong"
        padding="space-2"
        borderRadius="8"
        width="fit-content"
        className={'text-ax-bg-default px-2'}
    >
        {children}
    </Box>
);
