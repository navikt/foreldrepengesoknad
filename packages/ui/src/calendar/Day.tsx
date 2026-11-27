import dayjs, { Dayjs } from 'dayjs';
import React, { ReactElement } from 'react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formaterDatoUtenDag } from '@navikt/fp-utils';

import styles from './day.module.css';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

export type DayShape = 'square' | 'rounded-right' | 'rounded-left';

type Props = {
    isoDate: string;
    periodeColor: CalendarPeriodColor;
    isActive: boolean;
    shouldMoveFocus: boolean;
    srText?: string;
    isUpdated?: boolean;
    isHoverPreview?: boolean;
    Icon?: ReactElement;
    iconFull?: boolean;
    CornerIcon?: ReactElement;
    shape: DayShape;
    dateClickCallback?: (date: string) => void;
    onDateHover?: (date: string | undefined) => void;
    onDayFocus: (date: Dayjs) => void;
    onKeyboardNavigation: (date: Dayjs) => void;
};

export const Day = React.memo(
    ({
        isoDate,
        periodeColor,
        isActive,
        shouldMoveFocus,
        srText,
        isUpdated,
        isHoverPreview,
        Icon,
        iconFull,
        CornerIcon,
        shape,
        dateClickCallback,
        onDateHover,
        onDayFocus,
        onKeyboardNavigation,
    }: Props) => {
        const date = dayjs(isoDate);
        const day = date.date();

        const buttonRef = React.useRef<HTMLButtonElement>(null);

        React.useEffect(() => {
            if (shouldMoveFocus) {
                buttonRef.current?.focus();
            }
        }, [shouldMoveFocus]);

        const isClickable = !!dateClickCallback && !isWeekend(date);

        return (
            <button
                ref={buttonRef}
                type="button"
                data-testid={`day:${day};dayColor:${periodeColor}${Icon ? ';with-icon' : ''}${CornerIcon ? ';with-corner-icon' : ''}`}
                data-shape={shape}
                data-clickable={isClickable}
                data-fade-in={isUpdated}
                data-periode-color={periodeColor}
                data-hover-preview={isHoverPreview && !isWeekend(date) && periodeColor !== 'DARKBLUE'}
                tabIndex={isActive ? 0 : -1}
                className={styles.days}
                onFocus={isClickable ? () => onDayFocus(date) : undefined}
                onMouseEnter={onDateHover && isClickable ? () => onDateHover(isoDate) : undefined}
                onClick={isClickable ? () => dateClickCallback(isoDate) : undefined}
                onKeyDown={
                    dateClickCallback
                        ? (e) =>
                              handleKeyNavigationAndSelection(
                                  e,
                                  date,
                                  dateClickCallback,
                                  onKeyboardNavigation,
                                  onDateHover,
                              )
                        : undefined
                }
                aria-label={formaterDatoUtenDag(date) + (srText ? `, ${srText}` : '')}
            >
                {(!Icon || (!iconFull && periodeColor === 'GRAY')) && <span>{day}</span>}

                {Icon && iconFull && (
                    <>
                        {Icon}
                        {CornerIcon && <div className={styles.cornerIcon}>{CornerIcon}</div>}
                    </>
                )}
                {Icon && !iconFull && periodeColor !== 'GRAY' && (
                    <>
                        <span>{day}</span>
                        <div className={styles.icon}>{Icon}</div>
                    </>
                )}
            </button>
        );
    },
);

export const isWeekend = (date: Dayjs) => date.isoWeekday() === 6 || date.isoWeekday() === 7;

export const logOnLocalhost = (message: string) => {
    const isVitest = import.meta.env.MODE === 'test';
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
    onKeyboardNavigation: (date: Dayjs) => void,
    onDateHover?: (date: string | undefined) => void,
) => {
    if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key)
    ) {
        return;
    }

    e.preventDefault();
    const isClickable = !!dateClickCallback && !isWeekend(date);

    const navigateTo = (newDate: Dayjs) => {
        onKeyboardNavigation(newDate);
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
