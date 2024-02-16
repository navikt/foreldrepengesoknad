import styles from './day.module.css';

export enum PeriodType {
    INGEN = 'INGEN',
    FORELDREPENGER = 'FORELDREPENGER',
    TERMINDATO = 'TERMINDATO',
}

const DAY_STYLE = {
    [PeriodType.INGEN]: styles.none,
    [PeriodType.FORELDREPENGER]: styles.foreldrepenger,
    [PeriodType.TERMINDATO]: styles.termindato,
};

type Props = {
    day: number;
    periodType: PeriodType;
};

const Day: React.FunctionComponent<Props> = ({ day, periodType }) => {
    return <div className={DAY_STYLE[periodType]}>{day + 1}</div>;
};
export default Day;
