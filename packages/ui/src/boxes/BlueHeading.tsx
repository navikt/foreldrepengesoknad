import { Box } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const BlueHeading = ({ children }: Props) => (
    <Box
        background="brand-blue-moderate"
        borderRadius="medium medium 0 0"
        padding="space-24"
        borderWidth="0 0 2"
        style={{ borderStyle: 'solid', borderColor: 'var(--ax-brand-blue-300)' }}
    >
        {children}
    </Box>
);
