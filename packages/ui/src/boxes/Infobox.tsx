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
        background={isGray ? 'bg-subtle' : 'surface-alt-2-moderate'}
        padding="4"
        borderRadius="large"
    >
        <VStack gap="2">
            {(header || (!header && icon)) && (
                <HStack wrap={false} gap="4" justify="space-between" align={header ? 'center' : 'start'}>
                    {header && (
                        <Heading size="xsmall" level="3">
                            {header}
                        </Heading>
                    )}
                    {!header && children}
                    {icon && (
                        <IconCircleWrapper size="medium" color={isGray ? 'gray' : 'darkGreen'}>
                            {icon}
                        </IconCircleWrapper>
                    )}
                </HStack>
            )}
            {header && useHorizontalDivider && <HorizontalLine isBlue />}
            {(header || (!header && !icon)) && <div className={styles.leftCol}>{children}</div>}
        </VStack>
    </Box>
);

export default Infoboks;
