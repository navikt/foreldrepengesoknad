import styles from './day.module.css';

export enum PeriodType {
    INGEN = 'INGEN',
    FORELDREPENGER_MOR = 'FORELDREPENGER_MOR',
    FORELDREPENGER_FAR = 'FORELDREPENGER_FAR',
    HELGEDAG = 'HELGEDAG',
    TERMINDATO = 'TERMINDATO',
}

export enum DayType {
    FIRST_DAY = 'FIRST_DAY',
    LAST_DAY = 'LAST_DAY',
    FIRST_AND_LAST_DAY = 'FIRST_AND_LAST_DAY',
    BETWEEN_DAY = 'BETWEEN_DAY',
}

const DAY_STYLE = {
    [PeriodType.INGEN]: styles.none,
    [PeriodType.FORELDREPENGER_MOR]: styles.foreldrepengerMor,
    [PeriodType.FORELDREPENGER_FAR]: styles.foreldrepengerFar,
    [PeriodType.HELGEDAG]: styles.helgedag,
    [PeriodType.TERMINDATO]: styles.termindato,
};

type Props = {
    day: number;
    periodType: PeriodType;
    dayType: DayType;
};

const Day: React.FunctionComponent<Props> = ({ day, periodType, dayType }) => {
    const isStart = dayType === DayType.FIRST_DAY;
    const isEnd = dayType === DayType.LAST_DAY;
    const isStartAndEnd = dayType === DayType.FIRST_AND_LAST_DAY;
    return (
        <div
            className={`${styles.days} ${DAY_STYLE[periodType]} ${isStart && styles.firstDay} ${isEnd && styles.lastDay} ${isStartAndEnd && styles.firstAndLastDay}`}
        >
            {day + 1}
        </div>
    );
};
export default Day;
