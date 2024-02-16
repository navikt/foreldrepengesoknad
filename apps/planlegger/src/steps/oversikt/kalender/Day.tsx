import styles from './day.module.css';

export enum PeriodType {
    INGEN = 'INGEN',
    FORELDREPENGER = 'FORELDREPENGER',
}

type Props = {
    day: number;
    periodType: PeriodType;
};

const Day: React.FunctionComponent<Props> = ({ day, periodType }) => {
    return (
        <div className={PeriodType.FORELDREPENGER === periodType ? styles.foreldrepenger : styles.none}>{day + 1}</div>
    );
};
export default Day;
