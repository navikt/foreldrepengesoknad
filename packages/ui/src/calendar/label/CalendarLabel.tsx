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
<<<<<<< HEAD
=======

const PANEL_STYLE = {
    [PeriodeColor.NONE]: styles.none,
    [PeriodeColor.BLUE]: styles.bluePanel,
    [PeriodeColor.LIGHTBLUE]: styles.bluePanel,
    [PeriodeColor.BLUESTRIPED]: styles.bluePanel,
    [PeriodeColor.LIGHTGREENBLUE]: styles.bluePanel,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.greenPanel,
    [PeriodeColor.GREEN]: styles.greenPanel,
    [PeriodeColor.LIGHTGREEN]: styles.greenPanel,
    [PeriodeColor.GREENSTRIPED]: styles.greenPanel,
    [PeriodeColor.GRAY]: styles.grayPanel,
    [PeriodeColor.PINK]: styles.pinkPanel,
    [PeriodeColor.PURPLE]: styles.purlpePanel,
    [PeriodeColor.BLACK]: styles.grayPanel,
    [PeriodeColor.GREENOUTLINE]: styles.greenOutlinePanel,
    [PeriodeColor.BLUEOUTLINE]: styles.blueOutlinePanel,
};

interface Props {
    children: React.ReactElement | React.ReactElement[];
    iconType: PeriodeColor;
}

export const CalendarLabel = ({ children, iconType }: Props) => {
    if (iconType === PeriodeColor.PINK) {
        return (
            <div className={styles.pinkPanel}>
                <HStack gap="space-8" align="center">
                    {children}
                    <HeartFillIcon color="var(--ax-danger-500)" aria-hidden />
                </HStack>
            </div>
        );
    }
    if (iconType === PeriodeColor.BLACK) {
        return (
            <div className={styles.grayPanel}>
                <HStack gap="space-8" align="center">
                    <ExclamationmarkTriangleFillIcon style={{ color: 'var(--ax-bg-warning-strong)' }} />
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    } else if (iconType !== PeriodeColor.DARKBLUE) {
        return (
            <div className={`${PANEL_STYLE[iconType]}`}>
                <HStack gap="space-8" align="end" wrap={false}>
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    }
    return null;
};
>>>>>>> a54f07b0a8 (FIX)
