import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './day.module.css';

const DAY_STYLE = {
    [PeriodeColor.NONE]: styles.none,
    [PeriodeColor.BLUE]: styles.blueDay,
    [PeriodeColor.DARKBLUE]: styles.darkblueDay,
    [PeriodeColor.LIGHTGREEN]: styles.lightgreenDay,
    [PeriodeColor.GRAY]: styles.grayDay,
    [PeriodeColor.PINK]: styles.pinkDay,
    [PeriodeColor.PURPLE]: styles.purpleDay,
    [PeriodeColor.BLACK]: styles.blackDay,
    [PeriodeColor.BLACKOUTLINE]: styles.blackOutlineDay,
    [PeriodeColor.BLUEOUTLINE]: styles.blueOutlineDay,
    [PeriodeColor.GREENOUTLINE]: styles.greenOutlineDay,
    [PeriodeColor.LIGHTBLUE]: styles.lightblueDay,
    [PeriodeColor.GREEN]: styles.greenDay,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.lightblueGreenDay,
    [PeriodeColor.LIGHTGREENBLUE]: styles.lightgreenBlueDay,
    [PeriodeColor.GREENSTRIPED]: styles.greenStripedDay,
    [PeriodeColor.BLUESTRIPED]: styles.blueStripedDay,
};

type Props = {
    isoDate: string;
    periodeColor: PeriodeColor;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
};

export const Day = React.memo(({ isoDate, periodeColor, dateTooltipCallback, dateClickCallback }: Props) => {
    const day = dayjs(isoDate).date();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    console.log('Rendering Day:', day, periodeColor);

    return (
        <button
            data-testid={`day:${day};dayColor:${periodeColor}`}
            type="button"
            className={`${styles.days} ${DAY_STYLE[periodeColor]} ${!!dateClickCallback && styles.cursor}`}
            ref={buttonRef}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
            onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
            onClick={dateClickCallback ? () => dateClickCallback(isoDate) : undefined}
        >
            {day}
            {dateTooltipCallback && isPeriodDifferentFromNoneOrGray(periodeColor) && (
                <Popover open={isTooltipOpen} onClose={() => setIsTooltipOpen(false)} anchorEl={buttonRef.current}>
                    <Popover.Content>{dateTooltipCallback(isoDate)}</Popover.Content>
                </Popover>
            )}
        </button>
    );
});

const isPeriodDifferentFromNoneOrGray = (periodeColor: PeriodeColor) =>
    periodeColor !== PeriodeColor.NONE && periodeColor !== PeriodeColor.GRAY;
