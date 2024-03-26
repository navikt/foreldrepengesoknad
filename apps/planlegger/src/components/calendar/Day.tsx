import styles from './day.module.css';

export enum DayColor {
    NONE = 'NONE',
    PINK = 'PINK',
    BLUE = 'BLUE',
    GREEN = 'GREEN',
    GRAY = 'GRAY',
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
            className={`${styles.days} ${DAY_STYLE[dayColor]} ${isStart && styles.firstDay} ${isEnd && styles.lastDay} ${isStartAndEnd && styles.firstAndLastDay}`}
        >
            {day}
        </div>
    );
};
export default Day;
