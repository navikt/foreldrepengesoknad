import { useRef, useState } from 'react';

import { Popover } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';

import styles from './day.module.css';

export enum DayType {
    FIRST_DAY = 'FIRST_DAY',
    LAST_DAY = 'LAST_DAY',
    FIRST_AND_LAST_DAY = 'FIRST_AND_LAST_DAY',
    BETWEEN_DAY = 'BETWEEN_DAY',
}

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

const isDaysWithPeriode = (periodeColor: PeriodeColor) =>
    periodeColor !== PeriodeColor.NONE && periodeColor !== PeriodeColor.GRAY;

type Props = {
    day: number;
    periodeColor: PeriodeColor;
    dateTooltipCallback?: () => React.ReactElement | string;
    dateClickCallback?: () => void;
};

export const Day = ({ day, periodeColor, dateTooltipCallback, dateClickCallback }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        <button
            data-testid={`day:${day};dayColor:${periodeColor}`}
            type="button"
            className={`${styles.days} ${DAY_STYLE[periodeColor]} ${!!dateClickCallback && styles.cursor}`}
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
        </button>
    );
};
