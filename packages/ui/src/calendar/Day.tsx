import dayjs, { Dayjs } from 'dayjs';
import React, { useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formatDate } from '@navikt/fp-utils';

import styles from './day.module.css';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

const DAY_STYLE: Record<CalendarPeriodColor, string> = {
    ['NONE']: styles.none!,
    ['BLUE']: styles.blueDay!,
    ['DARKBLUE']: styles.darkblueDay!,
    ['LIGHTGREEN']: styles.lightgreenDay!,
    ['GRAY']: styles.grayDay!,
    ['DARKGRAY']: styles.darkgrayDay!,
    ['PINK']: styles.pinkDay!,
    ['PURPLE']: styles.purpleDay!,
    ['BLACK']: styles.blackDay!,
    ['BLACKOUTLINE']: styles.blackOutlineDay!,
    ['BLUEOUTLINE']: styles.blueOutlineDay!,
    ['GREENOUTLINE']: styles.greenOutlineDay!,
    ['LIGHTBLUE']: styles.lightblueDay!,
    ['GREEN']: styles.greenDay!,
    ['LIGHTBLUEGREEN']: styles.lightblueGreenDay!,
    ['LIGHTGREENBLUE']: styles.lightgreenBlueDay!,
    ['GREENSTRIPED']: styles.greenStripedDay!,
    ['BLUESTRIPED']: styles.blueStripedDay!,
    ['GREEN_WITH_BLACK_OUTLINE']: styles.greenWithBlackOutlineDay!,
    ['BLUE_WITH_BLACK_OUTLINE']: styles.blueWithBlackOutlineDay!,
};

type Props = {
    isoDate: string;
    periodeColor: CalendarPeriodColor;
    isFocused: boolean;
    srText?: string;
    isUpdated?: boolean;
    isMarked?: boolean;
    dateTooltipCallback?: (date: string) => React.ReactNode | string;
    dateClickCallback?: (date: string) => void;
    setFocusedDate: (date: Dayjs) => void;
};

export const Day = React.memo(
    ({
        isoDate,
        periodeColor,
        isFocused,
        srText,
        isUpdated,
        isMarked,
        dateTooltipCallback,
        dateClickCallback,
        setFocusedDate,
    }: Props) => {
        const date = dayjs(isoDate);
        const day = date.date();

        logOnLocalhost(`Rendering Day: ${day}, Color: ${periodeColor}`);

        const [isTooltipOpen, setIsTooltipOpen] = useState(false);

        const buttonRef = useRef<HTMLButtonElement>(null);

        const setButtonRef = React.useCallback(
            (el: HTMLButtonElement | null) => {
                buttonRef.current = el;

                if (el && isFocused) {
                    el.focus();
                }
            },
            [isFocused],
        );

        const isClickable = !!dateClickCallback && !isWeekend(date);

        return (
            <button
                ref={setButtonRef}
                type="button"
                data-testid={`day:${day};dayColor:${periodeColor}`}
                tabIndex={isFocused ? 0 : -1}
                className={`${styles.days} ${DAY_STYLE[periodeColor]} ${isClickable && styles.cursorAndHoover} ${isUpdated && styles.fadeIn}`}
                onFocus={isClickable ? () => setFocusedDate(date) : undefined}
                onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
                onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
                onClick={isClickable ? () => dateClickCallback(isoDate) : undefined}
                onAnimationEnd={() => buttonRef.current?.classList.remove(styles.fadeIn!)}
                onKeyDown={
                    dateClickCallback
                        ? (e) => handleKeyNavigationAndSelection(e, date, dateClickCallback, setFocusedDate)
                        : undefined
                }
                aria-label={formatDate(date) + (srText ? `, ${srText}` : '')}
            >
                {day}
                {isMarked && periodeColor !== 'GRAY' && <span className={styles.star}>★</span>}
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

export const isWeekend = (date: Dayjs) => date.isoWeekday() === 6 || date.isoWeekday() === 7;

export const logOnLocalhost = (message: string) => {
    const isVitest = typeof process !== 'undefined' && process.env.VITEST === 'true';
    if (globalThis.location.hostname === 'localhost' && !isVitest) {
        // eslint-disable-next-line no-console -- Logg rendring av Month og Day på localhost for å enkelt avdekke ytelsesproblem
        console.log(message);
    }
};

const handleKeyNavigationAndSelection = (
    e: React.KeyboardEvent,
    date: Dayjs,
    dateClickCallback: (date: string) => void,
    setFocusedDate: (date: Dayjs) => void,
) => {
    if (e.key === 'Tab') {
        return;
    }

    e.preventDefault();
    const isClickable = !!dateClickCallback && !isWeekend(date);

    switch (e.key) {
        case 'ArrowLeft':
            setFocusedDate(date.subtract(1, 'day'));
            break;
        case 'ArrowRight':
            setFocusedDate(date.add(1, 'day'));
            break;
        case 'ArrowUp':
            setFocusedDate(date.subtract(7, 'day'));
            break;
        case 'ArrowDown':
            setFocusedDate(date.add(7, 'day'));
            break;
        case 'Enter':
        case ' ':
            if (isClickable) {
                dateClickCallback(date.format(ISO_DATE_FORMAT));
            }
    }
};
