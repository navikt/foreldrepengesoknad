import { HStack } from '@navikt/ds-react';

import { CalendarPeriodColor } from '../types/CalendarPeriodColor';
import styles from './calendarLabel.module.css';

interface Props {
    children: React.ReactNode;
    color: CalendarPeriodColor;
}

export const CalendarLabel = ({ children, color }: Props) => {
    if (color !== 'DARKBLUE') {
        return (
            <HStack gap="space-8" align="center" wrap={false}>
                <div>{getRect(color)}</div>
                {children}
            </HStack>
        );
    }
    return null;
};

const getRect = (color: CalendarPeriodColor) => {
    switch (color) {
        case 'BLUE':
        case 'LIGHTBLUE':
            return <div className={styles.blueRect} />;
        case 'GREEN':
        case 'LIGHTGREEN':
            return <div className={styles.greenRect} />;
        case 'BLUEOUTLINE':
            return <div className={styles.blueOutlineRect} />;
        case 'BLACKOUTLINE':
            return <div className={styles.blackOutlineRect} />;
        case 'GREENOUTLINE':
            return <div className={styles.greenOutlineRect} />;
        case 'BLACK':
            return <div className={styles.blackRect} />;
        case 'LIGHTBLUEGREEN':
            return <div className={styles.lightblueGreenRect} />;
        case 'LIGHTGREENBLUE':
            return <div className={styles.lightgreenBlueRect} />;
        case 'BLUESTRIPED':
            return <div className={styles.blueStripedRect} />;
        case 'GREENSTRIPED':
            return <div className={styles.greenStripedRect} />;
        case 'GRAY':
            return <div className={styles.grayRect} />;
        case 'PURPLE':
            return <div className={styles.purpleRect} />;
        case 'PINK':
            return <div className={styles.pinkRect} />;
        case 'GREEN_WITH_BLACK_OUTLINE':
            return <div className={styles.greenWithBlackOutlineDayRect} />;
        default:
            return null;
    }
};
