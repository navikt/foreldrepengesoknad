import React from 'react';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import HorizontalLine from '../horizontalLine/HorizontalLine';
import IconCircleWrapper, { CircleColor } from '../iconCircle/IconCircleWrapper';
import styles from './infobox.module.css';

type InfoboxColor = 'green' | 'blue' | 'gray';

const getIconColor = (color: InfoboxColor): CircleColor => {
    if (color === 'gray') {
        return 'gray';
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
    children: React.ReactNode;
    icon?: React.ReactNode;
    color: InfoboxColor;
    shouldFadeIn?: boolean;
    useHorizontalDivider?: boolean;
}
const Infobox: React.FC<Props> = ({
    header,
    children,
    icon,
    color = 'green',
    shouldFadeIn = false,
    useHorizontalDivider = false,
}) => (
    <div className={`${styles.box} ${shouldFadeIn ? styles.animation : undefined} ${BOX_BACKGROUND[color]}`}>
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

export default Infobox;
