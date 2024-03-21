import { Box } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    isDarkGreen?: boolean;
}

const GreenPanel: React.FunctionComponent<Props> = ({ children, isDarkGreen }) => (
    <Box background={isDarkGreen ? 'surface-alt-2-moderate' : 'surface-alt-2-subtle'} borderRadius="large" padding="4">
        {children}
    </Box>
);

export default GreenPanel;
