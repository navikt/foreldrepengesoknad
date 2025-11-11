import { HStack } from '@navikt/ds-react';

import { CalendarPeriodColor } from '../types/CalendarPeriodColor';
import styles from './calendarLabel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    color: CalendarPeriodColor;
    onClick?: () => void;
    selected: boolean;
}

export const CalendarLabel = ({ children, color, onClick, selected }: Props) => {
    const getClassname = () => {
        if (selected) {
            if (color === 'GREEN' || color === 'GREENSTRIPED' || color === 'LIGHTGREEN' || color === 'LIGHTGREENBLUE') {
                return styles.greenSelected;
            }
            if (color === 'BLUE' || color === 'BLUESTRIPED' || color === 'LIGHTBLUE' || color === 'LIGHTBLUEGREEN') {
                return styles.blueSelected;
            }
            if (color === 'BLUEOUTLINE') {
                return styles.blueOutlineSelected;
            }
            if (color === 'BLACK') {
                return styles.blackSelected;
            }

            return styles.calendarLabelSelected;
        }

        if (color !== 'PINK' && color !== 'PURPLE' && color !== 'BLACKOUTLINE' && color !== 'GRAY') {
            return [styles.calendarLabel, styles.selectableCalendarLabel].join(' ');
        }

        return styles.calendarLabel;
    };

    if (color !== 'DARKBLUE') {
        return (
            <HStack className={getClassname()} gap="space-8" align="center" onClick={onClick}>
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
        default:
            return null;
    }
};
