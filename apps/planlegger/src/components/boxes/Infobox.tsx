import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import IconCircleWrapper from '../iconCircle/IconCircleWrapper';
import styles from './infobox.module.css';

interface Props {
    header: string | React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
    isGray?: boolean;
    shouldFadeIn?: boolean;
}
const Infoboks: React.FC<Props> = ({ header, children, icon, isGray = false, shouldFadeIn = false }) => (
    <Box
        className={shouldFadeIn ? styles.box : undefined}
        background={isGray ? 'bg-subtle' : 'surface-alt-3-subtle'}
        padding="4"
        borderRadius="large"
    >
        <VStack gap="2">
            <HStack justify="space-between" wrap={false} gap="4">
                <VStack gap="1">
                    <Heading size="xsmall" className={styles.header} level="3">
                        {header}
                    </Heading>
                    {children}
                </VStack>
                {icon && (
                    <IconCircleWrapper size="medium" color={isGray ? 'gray' : 'blue'}>
                        {icon}
                    </IconCircleWrapper>
                )}
            </HStack>
        </VStack>
    </Box>
);

export default Infoboks;
