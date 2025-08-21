import { useRef, useState } from 'react';

import '@navikt/ds-css';
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
    [PeriodeColor.LIGHTGREEN]: styles.lightgreenDay,
    [PeriodeColor.GRAY]: styles.grayDay,
    [PeriodeColor.PINK]: styles.pinkDay,
    [PeriodeColor.PURPLE]: styles.purpleDay,
    [PeriodeColor.BLACK]: styles.blackDay,
    [PeriodeColor.BLUEOUTLINE]: styles.blueOutlineDay,
    [PeriodeColor.GREENOUTLINE]: styles.greenOutlineDay,
    [PeriodeColor.LIGHTBLUE]: styles.lightblueDay,
    [PeriodeColor.GREEN]: styles.greenDay,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.lightblueGreenDay,
    [PeriodeColor.LIGHTGREENBLUE]: styles.lightgreenBlueDay,
    [PeriodeColor.GREENSTRIPED]: styles.greenStripedDay,
    [PeriodeColor.BLUESTRIPED]: styles.blueStripedDay,
};

const SELECTED_DAY_STYLE = {
    [PeriodeColor.NONE]: styles.none,
    [PeriodeColor.BLUE]: styles.blueDaySelected,
    [PeriodeColor.LIGHTGREEN]: styles.lightgreenSelected,
    [PeriodeColor.GRAY]: styles.grayDay,
    [PeriodeColor.PINK]: styles.pinkDay,
    [PeriodeColor.PURPLE]: styles.purpleDaySelected,
    [PeriodeColor.BLACK]: styles.blackDaySelected,
    [PeriodeColor.BLUEOUTLINE]: styles.blueOutlineSelected,
    [PeriodeColor.GREENOUTLINE]: styles.greenOutlineDaySelected,
    [PeriodeColor.LIGHTBLUE]: styles.lightblueDaySelected,
    [PeriodeColor.GREEN]: styles.greenDaySelected,
    [PeriodeColor.LIGHTBLUEGREEN]: styles.lightblueGreenDaySelected,
    [PeriodeColor.LIGHTGREENBLUE]: styles.lightgreenBlueDaySelected,
    [PeriodeColor.GREENSTRIPED]: styles.greenStripedDaySelected,
    [PeriodeColor.BLUESTRIPED]: styles.blueStripedDaySelected,
};

const isDaysWithPeriode = (periodeColor: PeriodeColor) =>
    periodeColor !== PeriodeColor.NONE && periodeColor !== PeriodeColor.GRAY;

type Props = {
    day: number;
    periodeColor: PeriodeColor;
    dayType: DayType;
    isSelected: boolean;
    dateTooltipCallback?: () => React.ReactElement | string;
    dateClickCallback?: () => void;
};

export const Day = ({ day, periodeColor, dayType, isSelected, dateTooltipCallback, dateClickCallback }: Props) => {
    const isStart = dayType === DayType.FIRST_DAY;
    const isEnd = dayType === DayType.LAST_DAY;
    const isStartAndEnd = dayType === DayType.FIRST_AND_LAST_DAY;

    const buttonRef = useRef<HTMLDivElement>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            data-testid={`day:${day};dayColor:${periodeColor};dayType:${dayType}`}
            className={`${styles.days} 
                ${!isSelected && DAY_STYLE[periodeColor]} 
                ${isSelected && SELECTED_DAY_STYLE[periodeColor]} 
                ${isStart && styles.firstDay} 
                ${isEnd && styles.lastDay} 
                ${isStartAndEnd && styles.firstAndLastDay} 
                ${!!dateClickCallback && styles.cursor}`}
            ref={buttonRef}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={dateTooltipCallback ? () => setIsTooltipOpen(true) : undefined}
            onMouseLeave={dateTooltipCallback ? () => setIsTooltipOpen(false) : undefined}
            onClick={dateClickCallback && isDaysWithPeriode(periodeColor) ? () => dateClickCallback() : undefined}
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
