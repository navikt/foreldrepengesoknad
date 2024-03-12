import styles from './day.module.css';

export enum PeriodType {
    INGEN = 'INGEN',
    FORELDREPENGER_MOR = 'FORELDREPENGER_MOR',
    FORELDREPENGER_FAR = 'FORELDREPENGER_FAR',
    HELGEDAG = 'HELGEDAG',
    TERMINDATO = 'TERMINDATO',
}

export enum DagIPeriode {
    FØRSTE_DAG = 'FØRSTE_DAG',
    SISTE_DAG = 'SISTE_DAG',
    FØRSTE_OG_SISTE_DAG = 'FØRSTE_OG_SISTE_DAG',
    DAG_MELLOM = 'DAG_MELLOM',
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
    startEllerSlutt?: DagIPeriode;
    isFirstDay?: boolean;
    isLastDay?: boolean;
};

const Day: React.FunctionComponent<Props> = ({ day, periodType, startEllerSlutt }) => {
    const erStart = startEllerSlutt === DagIPeriode.FØRSTE_DAG;
    const erSlutt = startEllerSlutt === DagIPeriode.SISTE_DAG;
    const erStartOgSlutt = startEllerSlutt === DagIPeriode.FØRSTE_OG_SISTE_DAG;
    return (
        <div
            className={`${styles.days} ${DAY_STYLE[periodType]} ${erStart && styles.firstDay} ${erSlutt && styles.lastDay} ${erStartOgSlutt && styles.firstAndLastDay}`}
        >
            {day + 1}
        </div>
    );
};
export default Day;
