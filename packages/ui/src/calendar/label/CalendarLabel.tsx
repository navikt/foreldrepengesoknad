import { ReactNode } from 'react';

import { HStack } from '@navikt/ds-react';

import { CalendarPeriodColor } from '../types/CalendarPeriodColor';
import styles from './calendarLabel.module.css';

interface Props {
    children: ReactNode;
    color: CalendarPeriodColor;
}

export const CalendarLabel = ({ children, color }: Props) => {
    if (color === 'NONE' || color === 'DARKBLUE') {
        return null;
    }
    return (
        <HStack gap="space-8" align="center" wrap={false}>
            <div>{getRect(color)}</div>
            {children}
        </HStack>
    );
};

const getRect = (color: Omit<CalendarPeriodColor, 'NONE' | 'DARKBLUE'>) => {
    return <div data-periode-color={color} className={styles.rect} />;
};
