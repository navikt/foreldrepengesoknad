import { HStack } from '@navikt/ds-react';

import { CalendarPeriodColor } from '../types/CalendarPeriodColor';
import styles from './calendarLabel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    color: CalendarPeriodColor;
    onClick?: () => void;
}

export const CalendarLabel = ({ children, color, onClick }: Props) => {
    if (color !== 'DARKBLUE') {
        return (
            <HStack className={styles.calendarLabel} gap="space-8" align="center" onClick={onClick}>
                {getRect(color)}
                {children}
            </HStack>
        );
    }
    return null;
};

const getRect = (color: CalendarPeriodColor) => {
    switch (color) {
        case 'BLUE':
            return <div className={styles.blueRect} />;
        case 'GREEN':
            return <div className={styles.greenRect} />;
        case 'LIGHTBLUE':
        case 'BLUEOUTLINE':
            return <div className={styles.blueOutlineRect} />;
        case 'BLACKOUTLINE':
            return <div className={styles.blackOutlineRect} />;
        case 'GREENOUTLINE':
        case 'LIGHTGREEN':
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
        default:
            return null;
    }
};
