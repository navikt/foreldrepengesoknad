import { ExclamationmarkTriangleFillIcon, HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './calendarLabel.module.css';

export const getSirkel = (color: PeriodeColor) => {
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
    [PeriodeColor.BLACK]: styles.grayPanel,
    [PeriodeColor.GREENOUTLINE]: styles.greenOutlinePanel,
    [PeriodeColor.BLUEOUTLINE]: styles.blueOutlinePanel,
};

interface Props {
    children: React.ReactElement | React.ReactElement[];
    iconType: PeriodeColor;
}

const CalendarLabel: FunctionComponent<Props> = ({ children, iconType }) => {
    if (iconType === PeriodeColor.PINK) {
        return (
            <div className={styles.pinkPanel}>
                <HStack gap="2" align="center">
                    {children}
                    <HeartFillIcon color="#F68282" aria-hidden />
                </HStack>
            </div>
        );
    }
    if (iconType === PeriodeColor.BLACK) {
        return (
            <div className={styles.grayPanel}>
                <HStack gap="2" align="center">
                    <ExclamationmarkTriangleFillIcon style={{ color: '#FF9100' }} />
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    } else {
        return (
            <div className={`${PANEL_STYLE[iconType]}`}>
                <HStack gap="2" align="end" wrap={false}>
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    }
};

export default CalendarLabel;
