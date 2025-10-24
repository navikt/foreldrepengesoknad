import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import styles from './day.module.css';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

const DAY_STYLE: Record<CalendarPeriodColor, string> = {
    ['NONE']: styles.none,
    ['BLUE']: styles.blueDay,
    ['DARKBLUE']: styles.darkblueDay,
    ['LIGHTGREEN']: styles.lightgreenDay,
    ['GRAY']: styles.grayDay,
    ['PINK']: styles.pinkDay,
    ['PURPLE']: styles.purpleDay,
    ['BLACK']: styles.blackDay,
    ['BLACKOUTLINE']: styles.blackOutlineDay,
    ['BLUEOUTLINE']: styles.blueOutlineDay,
    ['GREENOUTLINE']: styles.greenOutlineDay,
    ['LIGHTBLUE']: styles.lightblueDay,
    ['GREEN']: styles.greenDay,
    ['LIGHTBLUEGREEN']: styles.lightblueGreenDay,
    ['LIGHTGREENBLUE']: styles.lightgreenBlueDay,
    ['GREENSTRIPED']: styles.greenStripedDay,
    ['BLUESTRIPED']: styles.blueStripedDay,
};

type Props = {
    day: number;
    periodeColor: PeriodeColor;
    isSelected: boolean;
    dateTooltipCallback?: () => React.ReactElement | string;
    dateClickCallback?: () => void;
};

export const Day = ({ day, periodeColor, isSelected, dateTooltipCallback, dateClickCallback }: Props) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            data-testid={`day:${day};dayColor:${periodeColor};`}
            // eslint-disable-next-line max-len
            className={`${styles.days} ${!isSelected && DAY_STYLE[periodeColor]} ${isSelected && SELECTED_DAY_STYLE[periodeColor]} ${!!dateClickCallback && styles.cursor}`}
            ref={buttonRef}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
            onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
            onClick={dateClickCallback ? () => dateClickCallback() : undefined}
        >
            {day}
            {dateTooltipCallback && isDaysWithPeriode(periodeColor) && (
                <Popover open={isTooltipOpen} onClose={() => setIsTooltipOpen(false)} anchorEl={buttonRef.current}>
                    <Popover.Content>{dateTooltipCallback()}</Popover.Content>
                </Popover>
            )}
        </div>
    );
};
