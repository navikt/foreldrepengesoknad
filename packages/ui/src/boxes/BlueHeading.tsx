import { Box } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const BlueHeading = ({ children }: Props) => (
    <Box
        background="surface-alt-3-subtle"
        borderRadius="medium medium 0 0"
        padding="6"
        borderWidth="0 0 2"
        style={{ borderStyle: 'solid', borderColor: 'var(--a-deepblue-200)' }}
    >
        {children}
    </Box>
);
