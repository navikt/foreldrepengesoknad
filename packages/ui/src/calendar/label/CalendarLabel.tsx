import { HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './calendarLabel.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    color: PeriodeColor;
    onClick?: () => void;
}

export const CalendarLabel = ({ children, color, onClick }: Props) => {
    if (color !== PeriodeColor.DARKBLUE) {
        return (
            <HStack className={styles.calendarLabel} gap="space-8" align="center" onClick={onClick}>
                {getRect(color)}
                {children}
            </HStack>
        );
    }
    return null;
};

const getRect = (color: PeriodeColor) => {
    switch (color) {
        case PeriodeColor.BLUE:
            return <div className={styles.blueRect} />;
        case PeriodeColor.GREEN:
            return <div className={styles.greenRect} />;
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.BLUEOUTLINE:
            return <div className={styles.blueOutlineRect} />;
        case PeriodeColor.BLACKOUTLINE:
            return <div className={styles.blackOutlineRect} />;
        case PeriodeColor.GREENOUTLINE:
        case PeriodeColor.LIGHTGREEN:
            return <div className={styles.greenOutlineRect} />;
        case PeriodeColor.BLACK:
            return <div className={styles.blackRect} />;
        case PeriodeColor.LIGHTBLUEGREEN:
            return <div className={styles.lightblueGreenRect} />;
        case PeriodeColor.LIGHTGREENBLUE:
            return <div className={styles.lightgreenBlueRect} />;
        case PeriodeColor.BLUESTRIPED:
            return <div className={styles.blueStripedRect} />;
        case PeriodeColor.GREENSTRIPED:
            return <div className={styles.greenStripedRect} />;
        case PeriodeColor.GRAY:
            return <div className={styles.grayRect} />;
        case PeriodeColor.PURPLE:
            return <div className={styles.purpleRect} />;
        case PeriodeColor.PINK:
            return <div className={styles.pinkRect} />;
        default:
            return null;
    }
};
