import { Box } from '@navikt/ds-react';

import styles from './greenPanel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    isDarkGreen?: boolean;
    shouldFadeIn?: boolean;
}

const GreenPanel: React.FunctionComponent<Props> = ({ children, isDarkGreen = false, shouldFadeIn = false }) => (
    <Box
        className={shouldFadeIn ? styles.box : undefined}
        background={isDarkGreen ? 'surface-alt-2-moderate' : 'surface-alt-2-subtle'}
        borderRadius="large"
        padding="4"
    >
        {children}
    </Box>
);

export default GreenPanel;
