import { ExclamationmarkTriangleFillIcon, HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './calendarLabel.module.css';
import BlueSirkel from './icons/BlueSirkel';
import GreenSirkel from './icons/GreenSirkel';
import LightblueSirkel from './icons/LightblueSirkel';
import LightgreenSirkel from './icons/LightgreenSirkel';
import circleStyles from './icons/circle.module.css';

export const getSirkel = (color: PeriodeColor) => {
    switch (color) {
        case PeriodeColor.LIGHTBLUE:
            return <LightblueSirkel />;
        case PeriodeColor.BLUE:
            return <BlueSirkel />;
        case PeriodeColor.LIGHTGREEN:
            return <LightgreenSirkel />;
        case PeriodeColor.GREEN:
            return <GreenSirkel />;
        case PeriodeColor.ORANGE:
            return <div className={circleStyles.blackCircle} />;
        case PeriodeColor.GREENOUTLINE:
            return <div className={circleStyles.greenOutlineCircle} />;
        case PeriodeColor.BLUEOUTLINE:
            return <div className={circleStyles.blueOutlineCircle} />;
        case PeriodeColor.LIGHTBLUEGREEN:
            return <div className={circleStyles.lightblueGreenCircle} />;
        case PeriodeColor.LIGHTGREENBLUE:
            return <div className={circleStyles.lightgreenBlueCircle} />;
        case PeriodeColor.BLUESTRIPED:
            return <div className={circleStyles.blueStripedCircle} />;
        case PeriodeColor.GREENSTRIPED:
            return <div className={circleStyles.greenStripedCircle} />;
        default:
            return null;
    }
};

const ICON_STYLE = {
    [PeriodeColor.NONE]: styles.none,
    [PeriodeColor.BLUE]: styles.bluePanel,
    [PeriodeColor.LIGHTBLUE]: styles.bluePanel,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.greenPanel,
    [PeriodeColor.BLUESTRIPED]: styles.bluePanel,
    [PeriodeColor.GREEN]: styles.greenPanel,
    [PeriodeColor.LIGHTGREEN]: styles.greenPanel,
    [PeriodeColor.LIGHTGREENBLUE]: styles.bluePanel,
    [PeriodeColor.GREENSTRIPED]: styles.greenPanel,
    [PeriodeColor.GRAY]: styles.grayPanel,
    [PeriodeColor.PINK]: styles.pinkPanel,
    [PeriodeColor.ORANGE]: styles.grayPanel,
    [PeriodeColor.GREENOUTLINE]: styles.grayPanel,
    [PeriodeColor.BLUEOUTLINE]: styles.grayPanel,
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
    if (iconType === PeriodeColor.ORANGE) {
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
            <div className={`${ICON_STYLE[iconType]}`}>
                <HStack gap="2" align="end" wrap={false}>
                    {children}
                    <div className={styles.margin}>{getSirkel(iconType)}</div>
                </HStack>
            </div>
        );
    }
};

export default CalendarLabel;
