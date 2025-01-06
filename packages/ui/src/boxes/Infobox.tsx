import React from 'react';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { HorizontalLine } from '../horizontal-line/HorizontalLine';
import { CircleColor, IconCircleWrapper } from '../icon-circle/IconCircleWrapper';
import styles from './infobox.module.css';

type InfoboxColor = 'green' | 'blue' | 'gray';

const getIconColor = (color: InfoboxColor): CircleColor => {
    if (color === 'gray') {
        return 'gray';
    }
    if (color === 'blue') {
        return 'blue';
    }
    return color === 'green' ? 'darkGreen' : 'darkBlue';
};

const BOX_BACKGROUND = {
    gray: styles.gray,
    green: styles.green,
    blue: styles.blue,
};

interface Props {
    header?: string | React.ReactNode;
    headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
    children: React.ReactNode;
    icon?: React.ReactNode;
    color: InfoboxColor;
    shouldFadeIn?: boolean;
    useHorizontalDivider?: boolean;
}

export const Infobox = ({
    header,
    headingLevel = '3',
    children,
    icon,
    color = 'green',
    shouldFadeIn = false,
    useHorizontalDivider = false,
}: Props) => (
    <div className={`${styles.box} ${shouldFadeIn ? styles.animation : undefined} ${BOX_BACKGROUND[color]}`}>
        <VStack gap="2">
            {(header || (!header && icon)) && (
                <HStack wrap={false} gap="4" justify="space-between" align={header ? 'center' : 'start'}>
                    {header && (
                        <Heading size="xsmall" level={headingLevel}>
                            {header}
                        </Heading>
                    )}
                    {!header && children}
                    {icon && (
                        <IconCircleWrapper size="medium" color={getIconColor(color)}>
                            {icon}
                        </IconCircleWrapper>
                    )}
                </HStack>
            )}
            {header && useHorizontalDivider && <HorizontalLine isBlue />}
            {(header || (!header && !icon)) && <div className={styles.leftCol}>{children}</div>}
        </VStack>
    </div>
);
