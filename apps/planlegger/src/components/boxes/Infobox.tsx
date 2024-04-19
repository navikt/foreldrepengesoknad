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
            <HStack justify="space-between" wrap={false}>
                <Heading size="small" className={styles.header} level="3">
                    {header}
                </Heading>
                {icon && (
                    <IconCircleWrapper size="medium" color={isGray ? 'gray' : 'blue'}>
                        {icon}
                    </IconCircleWrapper>
                )}
            </HStack>
            {children}
        </VStack>
    </Box>
);

export default Infoboks;
