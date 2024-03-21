import { Box } from '@navikt/ds-react';

interface Props {
    useDarkGreen?: boolean;
    children: React.ReactElement | React.ReactElement[];
}

const GreenHeading: React.FunctionComponent<Props> = ({ children, useDarkGreen = false }) => (
    <Box
        background={useDarkGreen ? 'surface-alt-2-moderate' : 'surface-alt-2-subtle'}
        borderRadius="medium medium 0 0"
        padding="6"
        borderWidth="0 0 2"
        borderColor="border-alt-2"
    >
        {children}
    </Box>
);

export default GreenHeading;
