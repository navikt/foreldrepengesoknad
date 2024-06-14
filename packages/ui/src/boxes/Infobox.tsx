import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import HorizontalLine from '../horizontalLine/HorizontalLine';
import IconCircleWrapper from '../iconCircle/IconCircleWrapper';
import styles from './infobox.module.css';

interface Props {
    header?: string | React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
    isGray?: boolean;
    shouldFadeIn?: boolean;
    useHorizontalDivider?: boolean;
}
const Infoboks: React.FC<Props> = ({
    header,
    children,
    icon,
    isGray = false,
    shouldFadeIn = false,
    useHorizontalDivider = false,
}) => (
    <Box
        className={shouldFadeIn ? styles.box : undefined}
        background={isGray ? 'bg-subtle' : 'surface-alt-3-subtle'}
        padding="4"
        borderRadius="large"
    >
        <HStack wrap={false} gap="4" justify="space-between">
            <VStack gap="2" className={styles.leftCol}>
                {header && (
                    <Heading size="xsmall" level="3">
                        {header}
                    </Heading>
                )}
                {useHorizontalDivider && <HorizontalLine isBlue />}
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
