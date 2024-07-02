import { Box } from '@navikt/ds-react';

interface Props {
    isDarkBlue?: boolean;
    children: React.ReactElement | React.ReactElement[];
}

const BlueHeading: React.FunctionComponent<Props> = ({ children, isDarkBlue = false }) => (
    <Box
        background={isDarkBlue ? 'surface-alt-2-moderate' : 'surface-alt-3-subtle'}
        borderRadius="medium medium 0 0"
        padding="6"
        borderWidth="0 0 2"
        style={{ borderStyle: 'solid', borderColor: 'var(--a-deepblue-200)' }}
    >
        {children}
    </Box>
);

export default BlueHeading;
