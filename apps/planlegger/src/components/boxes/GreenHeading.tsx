import { Box } from '@navikt/ds-react';

interface Props {
    isDarkGreen?: boolean;
    children: React.ReactElement | React.ReactElement[];
}

const GreenHeading: React.FunctionComponent<Props> = ({ children, isDarkGreen = false }) => (
    <Box
        background={isDarkGreen ? 'surface-alt-2-moderate' : 'surface-alt-2-subtle'}
        borderRadius="medium medium 0 0"
        padding="6"
        borderWidth="0 0 2"
        borderColor="border-alt-2"
    >
        {children}
    </Box>
);

export default GreenHeading;
