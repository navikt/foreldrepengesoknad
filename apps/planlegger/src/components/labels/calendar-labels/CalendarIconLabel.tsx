import { HeartFillIcon } from '@navikt/aksel-icons';

import { HStack } from '@navikt/ds-react';

import styles from './calendarIconLabel.module.css';
import { BlåSirkel } from './icons/BlåSirkel';
import { GrønnSirkel } from './icons/GrønnSirkel';
import { LillaSirkel } from './icons/LillaSirkel';

type IconType = 'blue' | 'green' | 'pink' | 'purple';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    iconType: IconType;
}

export const CalendarIconLabel = ({ children, iconType }: Props) => {
    if (iconType === 'pink') {
        return (
            <div className={styles.pinkPanel}>
                <HStack gap="space-8" align="center">
                    {children}
                    <HeartFillIcon color="#F68282" aria-hidden />
                </HStack>
            </div>
        );
    }
    if (iconType === 'purple') {
        return (
            <div className={styles.purplePanel}>
                <HStack gap="space-8" align="center">
                    {children}
                    <div>{<LillaSirkel />} </div>
                </HStack>
            </div>
        );
    } else {
        return (
            <div className={iconType === 'blue' ? styles.bluePanel : styles.greenPanel}>
                <HStack gap="space-8" align="center" wrap={false}>
                    {children}

                    <div>{iconType === 'blue' ? <BlåSirkel /> : <GrønnSirkel />}</div>
                </HStack>
            </div>
        );
    }
};
