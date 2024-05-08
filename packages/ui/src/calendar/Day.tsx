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
    [PeriodeColor.ORANGE]: styles.orangeDay,
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
    day: number;
    periodeColor: PeriodeColor;
    dayType: DayType;
};

const Day: React.FunctionComponent<Props> = ({ day, periodeColor, dayType }) => {
    const isStart = dayType === DayType.FIRST_DAY;
    const isEnd = dayType === DayType.LAST_DAY;
    const isStartAndEnd = dayType === DayType.FIRST_AND_LAST_DAY;
    return (
        <div
            data-testid={`day:${day};dayColor:${periodeColor};dayType:${dayType}`}
            className={`${styles.days} ${DAY_STYLE[periodeColor]} ${isStart && styles.firstDay} ${isEnd && styles.lastDay} ${isStartAndEnd && styles.firstAndLastDay}`}
        >
            {day}
        </div>
    );
};
export default Day;
