import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import styles from './Infoboks.module.css';

interface Props {
    header: string | React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
}
const InfoboksGenerell: React.FC<Props> = ({ header, children, icon }) => {
    return (
        <Box background="bg-subtle" padding="4" borderRadius="large">
            <VStack gap="2">
                <HStack justify="space-between">
                    <Heading size="small" className={styles.header}>
                        {header}
                    </Heading>
                    <div className={`${styles.circle} ${styles.circle__general}`}>{icon}</div>
                </HStack>

                {children}
            </VStack>
        </Box>
    );
};

export default InfoboksGenerell;
