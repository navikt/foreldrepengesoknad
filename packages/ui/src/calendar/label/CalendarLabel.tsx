import { ExclamationmarkTriangleFillIcon, HeartFillIcon } from '@navikt/aksel-icons';

import { HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './calendarLabel.module.css';

const getSirkel = (color: PeriodeColor) => {
    switch (color) {
        case PeriodeColor.BLUE:
            return <div className={styles.blueCircle} />;
        case PeriodeColor.GREEN:
            return <div className={styles.greenCircle} />;
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.BLUEOUTLINE:
            return <div className={styles.blueOutlineCircle} />;
        case PeriodeColor.GREENOUTLINE:
        case PeriodeColor.LIGHTGREEN:
            return <div className={styles.greenOutlineCircle} />;
        case PeriodeColor.BLACK:
            return <div className={styles.blackCircle} />;
        case PeriodeColor.LIGHTBLUEGREEN:
            return <div className={styles.lightblueGreenCircle} />;
        case PeriodeColor.LIGHTGREENBLUE:
            return <div className={styles.lightgreenBlueCircle} />;
        case PeriodeColor.BLUESTRIPED:
            return <div className={styles.blueStripedCircle} />;
        case PeriodeColor.GREENSTRIPED:
            return <div className={styles.greenStripedCircle} />;
        case PeriodeColor.GRAY:
            return <div className={styles.grayCircle} />;
        case PeriodeColor.PURPLE:
            return <div className={styles.purpleCircle} />;
        default:
            return null;
    }
};

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
    } else {
        return (
            <div className={`${PANEL_STYLE[iconType]}`}>
                <HStack gap="space-8" align="end" wrap={false}>
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    }
};
