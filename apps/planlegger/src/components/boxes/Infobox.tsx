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
        <HStack wrap={false} gap="4">
            <VStack gap="2" className={styles.leftCol}>
                <Heading size="xsmall" level="3">
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
    </Box>
);

export default Infoboks;
