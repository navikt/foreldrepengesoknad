import styles from './day.module.css';

export enum DayColor {
    NONE = 'NONE',
    PINK = 'PINK',
    LIGHTBLUE = 'LIGHTBLUE',
    BLUE = 'BLUE',
    DARKGREEN = 'DARKGREEN',
    GREEN = 'GREEN',
    GRAY = 'GRAY',
    ORANGE = 'ORANGE',
    PURPLE = 'PURPLE',
    LIGHTBLUEDARKGREEN = 'LIGHTBLUEDARKGREEN',
    GREENBLUE = 'GREENBLUE',
    DARKGREENGREY = 'DARKGREENGREY',
    BLUEGREY = 'BLUEGREY',
}

export enum DayType {
    FIRST_DAY = 'FIRST_DAY',
    LAST_DAY = 'LAST_DAY',
    FIRST_AND_LAST_DAY = 'FIRST_AND_LAST_DAY',
    BETWEEN_DAY = 'BETWEEN_DAY',
}

const DAY_STYLE = {
    [DayColor.NONE]: styles.none,
    [DayColor.BLUE]: styles.blueDay,
    [DayColor.GREEN]: styles.greenDay,
    [DayColor.GRAY]: styles.grayDay,
    [DayColor.PINK]: styles.pinkDay,
    [DayColor.ORANGE]: styles.orangeDay,
    [DayColor.PURPLE]: styles.purpleDay,
    [DayColor.LIGHTBLUE]: styles.lightblueDay,
    [DayColor.DARKGREEN]: styles.darkgreenDay,
    [DayColor.LIGHTBLUEDARKGREEN]: styles.lightBlueDarkGreenDay,
    [DayColor.GREENBLUE]: styles.greenBlueDay,
    [DayColor.DARKGREENGREY]: styles.darkgreenGreyDay,
    [DayColor.BLUEGREY]: styles.blueGreyDay,
};

type Props = {
    day: number;
    dayColor: DayColor;
    dayType: DayType;
};

const Day: React.FunctionComponent<Props> = ({ day, dayColor, dayType }) => {
    const isStart = dayType === DayType.FIRST_DAY;
    const isEnd = dayType === DayType.LAST_DAY;
    const isStartAndEnd = dayType === DayType.FIRST_AND_LAST_DAY;
    return (
        <div
            data-testid={`day:${day};dayColor:${dayColor};dayType:${dayType}`}
            className={`${styles.days} ${DAY_STYLE[dayColor]} ${isStart && styles.firstDay} ${isEnd && styles.lastDay} ${isStartAndEnd && styles.firstAndLastDay}`}
        >
            {day}
        </div>
    );
};
export default Day;
