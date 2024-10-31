import { HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { HStack } from '@navikt/ds-react';

import styles from './calendarIconLabel.module.css';
import BlåSirkel from './icons/BlåSirkel';
import GrønnSirkel from './icons/GrønnSirkel';
import LillaSirkel from './icons/LillaSirkel';

type IconType = 'blue' | 'green' | 'pink' | 'purple';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    iconType: IconType;
}

const CalendarLabel: FunctionComponent<Props> = ({ children, iconType }) => {
    if (iconType === 'pink') {
        return (
            <div className={styles.pinkPanel}>
                <HStack gap="2" align="center">
                    {children}
                    <HeartFillIcon color="#F68282" aria-hidden />
                </HStack>
            </div>
        );
    }
    if (iconType === 'purple') {
        return (
            <div className={styles.purplePanel}>
                <HStack gap="2" align="center">
                    {children}
                    <div className={styles.margin}>{<LillaSirkel />} </div>
                </HStack>
            </div>
        );
    } else {
        return (
            <div className={iconType === 'blue' ? styles.bluePanel : styles.greenPanel}>
                <HStack gap="2" align="end" wrap={false}>
                    {children}

                    <div className={styles.margin}>{iconType === 'blue' ? <BlåSirkel /> : <GrønnSirkel />}</div>
                </HStack>
            </div>
        );
    }
};

export default CalendarLabel;
