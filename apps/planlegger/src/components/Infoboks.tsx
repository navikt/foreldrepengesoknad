import classnames from 'classnames';
import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import styles from './Infoboks.module.css';
import ikonStyles from './ikoner/Ikon.module.css';

interface Props {
    header: string | React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
}
const Infoboks: React.FC<Props> = ({ header, children, icon }) => {
    return (
        <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
            <VStack gap="2">
                <HStack justify="space-between">
                    <Heading size="small" className={styles.header}>
                        {header}
                    </Heading>
                    <div className={classnames(ikonStyles.circle, ikonStyles.circle__info)}>{icon}</div>
                </HStack>

                {children}
            </VStack>
        </Box>
    );
};

export default Infoboks;
