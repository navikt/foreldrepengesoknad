import { BabyWrappedIcon } from '@navikt/aksel-icons';
import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import styles from './Infoboks.module.css';

interface Props {
    header: string | React.ReactNode;
    children: React.ReactNode;
}
const InfoboksGenerell: React.FC<Props> = ({ header, children }) => {
    return (
        <Box background="bg-subtle" padding="4" borderRadius="large">
            <VStack gap="2">
                <HStack justify="space-between">
                    <Heading size="small" className={styles.header}>
                        {header}
                    </Heading>
                    <div className={`${styles.circle} ${styles.circle__general}`}>
                        <BabyWrappedIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" />
                    </div>
                </HStack>

                {children}
            </VStack>
        </Box>
    );
};

export default InfoboksGenerell;
