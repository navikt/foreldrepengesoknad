import dayjs, { Dayjs } from 'dayjs';
import React, { ReactElement, useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formatDate } from '@navikt/fp-utils';

import styles from './day.module.css';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

export type DayShape = 'square' | 'rounded-right' | 'rounded-left';

const DAY_STYLE: Record<CalendarPeriodColor, string> = {
    ['NONE']: styles.none!,
    ['BLUE']: styles.blueDay!,
    ['DARKBLUE']: styles.darkblueDay!,
    ['LIGHTGREEN']: styles.lightgreenDay!,
    ['GRAY']: styles.grayDay!,
    ['DARKGRAY']: styles.darkgrayDay!,
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
    ['BEIGEOUTLINE']: styles.beigeOutlineDay!,
};

type Props = {
    isoDate: string;
    periodeColor: CalendarPeriodColor;
    isFocused: boolean;
    srText?: string;
    isUpdated?: boolean;
    isHoverPreview?: boolean;
    Icon?: ReactElement;
    iconFull?: boolean;
    shape: DayShape;
    dateTooltipCallback?: (date: string) => React.ReactNode | string;
    dateClickCallback?: (date: string) => void;
    onDateHover?: (date: string | undefined) => void;
    setFocusedDate: (date: Dayjs) => void;
};

export const Day = ({
    isoDate,
    periodeColor,
    isFocused,
    srText,
    isUpdated,
    isHoverPreview,
    Icon,
    iconFull,
    shape,
    dateTooltipCallback,
    dateClickCallback,
    onDateHover,
    setFocusedDate,
}: Props) => {
    const date = dayjs(isoDate);
    const day = date.date();

    logOnLocalhost(`Rendering Day: ${day}, Color: ${periodeColor}`);

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const setButtonRef = (el: HTMLButtonElement | null) => {
        buttonRef.current = el;

        if (el && isFocused) {
            el.focus();
        }
    };

    const isClickable = !!dateClickCallback && !isWeekend(date);
    const colorClass =
        isHoverPreview && !isWeekend(date) && periodeColor !== 'DARKBLUE'
            ? styles.hoverPreviewDay
            : DAY_STYLE[periodeColor];

    return (
        <button
            ref={setButtonRef}
            type="button"
            data-testid={`day:${day};dayColor:${periodeColor}${Icon ? `;with-icon` : ''}`}
            tabIndex={isFocused ? 0 : -1}
            className={`${styles.days} ${colorClass} ${isClickable && styles.cursorAndHoover} ${isUpdated && styles.fadeIn} 
                ${shape === 'rounded-left' && styles.roundedLeft} ${shape === 'rounded-right' && styles.roundedRight}`}
            onFocus={isClickable ? () => setFocusedDate(date) : undefined}
            onMouseEnter={onDateHover && isClickable ? () => onDateHover(isoDate) : undefined}
            onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
            onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
            onClick={isClickable ? () => dateClickCallback(isoDate) : undefined}
            onAnimationEnd={() => buttonRef.current?.classList.remove(styles.fadeIn!)}
            onKeyDown={
                dateClickCallback
                    ? (e) => handleKeyNavigationAndSelection(e, date, dateClickCallback, setFocusedDate, onDateHover)
                    : undefined
            }
            aria-label={formatDate(date) + (srText ? `, ${srText}` : '')}
        >
            {(!Icon || (!iconFull && periodeColor === 'GRAY')) && day}

            {Icon && iconFull && Icon}
            {Icon && !iconFull && periodeColor !== 'GRAY' && (
                <>
                    {day}
                    <div className={styles.icon}>{Icon}</div>
                </>
            )}
            {dateTooltipCallback && isPeriodDifferentFromNoneOrGray(periodeColor) && (
                <Popover open={isTooltipOpen} onClose={() => setIsTooltipOpen(false)} anchorEl={buttonRef.current}>
                    <Popover.Content>{dateTooltipCallback(isoDate)}</Popover.Content>
                </Popover>
            )}
        </button>
    );
};

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

const skipWeekends = (date: Dayjs, direction: 1 | -1): Dayjs => {
    let next = date.add(direction, 'day');
    while (isWeekend(next)) {
        next = next.add(direction, 'day');
    }
    return next;
};

const handleKeyNavigationAndSelection = (
    e: React.KeyboardEvent,
    date: Dayjs,
    dateClickCallback: (date: string) => void,
    setFocusedDate: (date: Dayjs) => void,
    onDateHover?: (date: string | undefined) => void,
) => {
    if (e.key === 'Tab') {
        return;
    }

    e.preventDefault();
    const isClickable = !!dateClickCallback && !isWeekend(date);

    const navigateTo = (newDate: Dayjs) => {
        setFocusedDate(newDate);
        onDateHover?.(newDate.format(ISO_DATE_FORMAT));
    };

    switch (e.key) {
        case 'ArrowLeft':
            navigateTo(skipWeekends(date, -1));
            break;
        case 'ArrowRight':
            navigateTo(skipWeekends(date, 1));
            break;
        case 'ArrowUp':
            navigateTo(date.subtract(7, 'day'));
            break;
        case 'ArrowDown':
            navigateTo(date.add(7, 'day'));
            break;
        case 'Enter':
        case ' ':
            if (isClickable) {
                dateClickCallback(date.format(ISO_DATE_FORMAT));
            }
    }
};
