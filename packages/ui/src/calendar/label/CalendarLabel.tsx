import { HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './calendarLabel.module.css';
import BlueHalvsirkel from './icons/BlueHalvsirkel';
import BlueSirkel from './icons/BlueSirkel';
import GreenHalvsirkel from './icons/GreenHalvsirkel';
import GreenStripedSirkel from './icons/GreenStripedSirkel';
import LightblueSirkel from './icons/LightblueSirkel';
import LightgreenSirkel from './icons/LightgreenSirkel';
import OrangeSirkel from './icons/OrangeSirkel';
import PurpleSirkel from './icons/PurpleSirkel';

export const getSirkel = (color: PeriodeColor) => {
    switch (color) {
        case PeriodeColor.LIGHTBLUE:
            return <LightblueSirkel />;
        case PeriodeColor.BLUE:
            return <BlueSirkel />;
        case PeriodeColor.LIGHTGREEN:
            return <LightgreenSirkel />;
        case PeriodeColor.GREEN:
            return <LightblueSirkel />;
        case PeriodeColor.ORANGE:
            return <OrangeSirkel />;
        case PeriodeColor.PURPLE:
            return <PurpleSirkel />;
        case PeriodeColor.LIGHTBLUEGREEN:
            return <GreenHalvsirkel />;
        case PeriodeColor.LIGHTGREENBLUE:
            return <BlueHalvsirkel />;
        case PeriodeColor.BLUESTRIPED:
            return <BlueSirkel />;
        case PeriodeColor.GREENSTRIPED:
            return <GreenStripedSirkel />;
        default:
            return null;
    }
};

const ICON_STYLE = {
    [PeriodeColor.NONE]: styles.none,
    [PeriodeColor.BLUE]: styles.bluePanel,
    [PeriodeColor.LIGHTBLUE]: styles.bluePanel,
    [PeriodeColor.GREEN]: styles.greenPanel,
    [PeriodeColor.LIGHTGREEN]: styles.greenPanel,
    [PeriodeColor.GRAY]: styles.grayPanel,
    [PeriodeColor.PINK]: styles.pinkPanel,
    [PeriodeColor.ORANGE]: styles.orangePanel,
    [PeriodeColor.PURPLE]: styles.purplePanel,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.bluePanel,
    [PeriodeColor.LIGHTGREENBLUE]: styles.greenPanel,
    [PeriodeColor.GREENSTRIPED]: styles.greenPanel,
    [PeriodeColor.BLUESTRIPED]: styles.bluePanel,
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
