import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import IconCircle from './ikoner/IconCircle';
import styles from './infoboks.module.css';

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
                    <IconCircle color="gray" size="medium">
                        <>{icon}</>
                    </IconCircle>
                </HStack>

                {children}
            </VStack>
        </Box>
    );
};

export default InfoboksGenerell;
