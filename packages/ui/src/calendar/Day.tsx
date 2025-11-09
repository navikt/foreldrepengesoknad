import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

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
    isoDate: string;
    periodeColor: CalendarPeriodColor;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    isFocused: boolean;
    onFocusChange: () => void;
};

export const Day = React.memo(
    ({ isoDate, periodeColor, dateTooltipCallback, dateClickCallback, isFocused, onFocusChange }: Props) => {
        const day = dayjs(isoDate).date();

        const buttonRef = useRef<HTMLButtonElement>(null);
        const [isTooltipOpen, setIsTooltipOpen] = useState(false);

        console.log('Rendering Day:', day, periodeColor);

        // Move DOM focus when focusedDate changes
        React.useEffect(() => {
            if (isFocused && buttonRef.current) {
                buttonRef.current.focus();
            }
        }, [isFocused]);

        return (
            <button
                data-testid={`day:${day};dayColor:${periodeColor}`}
                type="button"
                className={`${styles.days} ${DAY_STYLE[periodeColor]} ${!!dateClickCallback && styles.cursorAndHoover}`}
                ref={buttonRef}
                tabIndex={isFocused ? 0 : -1} // only one tabbable element
                onFocus={onFocusChange}
                onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
                onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
                onClick={dateClickCallback ? () => dateClickCallback(isoDate) : undefined}
                onKeyDown={dateClickCallback ? (e) => e.key === 'Enter' && dateClickCallback(isoDate) : undefined}
            >
                {day}
                {dateTooltipCallback && isPeriodDifferentFromNoneOrGray(periodeColor) && (
                    <Popover open={isTooltipOpen} onClose={() => setIsTooltipOpen(false)} anchorEl={buttonRef.current}>
                        <Popover.Content>{dateTooltipCallback(isoDate)}</Popover.Content>
                    </Popover>
                )}
            </button>
        );
    },
);

const isPeriodDifferentFromNoneOrGray = (periodeColor: CalendarPeriodColor): boolean =>
    periodeColor !== 'NONE' && periodeColor !== 'GRAY';
