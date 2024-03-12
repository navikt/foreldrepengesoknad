import dayjs, { Dayjs } from 'dayjs';
import { FunctionComponent } from 'react';

import { HStack, VStack } from '@navikt/ds-react';

import Day, { DagIPeriode, PeriodType } from './Day';
import Month from './Month';
import Year from './Year';

type Periode = {
    fom: Dayjs;
    tom: Dayjs;
};

const finnPeriodeType = (
    year: number,
    month: number,
    day: number,
    startdatoSøker1: Date,
    sluttdatoSøker1: Dayjs,
    startdatoSøker2: Dayjs | undefined,
    sluttdatoSøker2: Dayjs,
    termindatoEllerFødselsdato: Dayjs,
) => {
    const date = dayjs().year(year).month(month).date(day);

    if (date.isBefore(startdatoSøker1) || date.isAfter(sluttdatoSøker2)) {
        return PeriodType.INGEN;
    }
    if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        return PeriodType.HELGEDAG;
    }
    if (date.isSame(termindatoEllerFødselsdato, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isBetween(startdatoSøker1, sluttdatoSøker1)) {
        return PeriodType.FORELDREPENGER_MOR;
    }

    if (date.isBetween(startdatoSøker2, sluttdatoSøker2)) {
        return PeriodType.FORELDREPENGER_FAR;
    }
    return PeriodType.INGEN;
};

const erFørsteDag = (date: Dayjs, day: number, perioder: Periode[]) => {
    return (
        date.isoWeekday() === 5 ||
        date.isoWeekday() === 7 ||
        day === 0 ||
        perioder.some((periode) => date.startOf('day').isSame(periode.fom.startOf('day')))
    );
};

const erSisteDag = (date: Dayjs, day: number, perioder: Periode[]) => {
    return (
        date.isoWeekday() === 6 ||
        date.isoWeekday() === 4 ||
        day === date.daysInMonth() - 1 ||
        perioder.some((periode) => date.startOf('day').isSame(periode.tom.startOf('day')))
    );
};

const findMonthsOfYear = (year: number, startdatoSøker1: Dayjs, sluttdatoSøker2: Dayjs): number[] => {
    if (startdatoSøker1.year() === year) {
        const endOfYear = startdatoSøker1.endOf('year');
        const lastDate = sluttdatoSøker2.isBefore(endOfYear) ? sluttdatoSøker2 : endOfYear;
        return [...new Array(lastDate.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= startdatoSøker1.month());
    }
    if (sluttdatoSøker2.year() === year) {
        const startOfYear = sluttdatoSøker2.startOf('year');
        const firstDate = startdatoSøker1.isAfter(startOfYear) ? startdatoSøker1 : startOfYear;
        return [...new Array(sluttdatoSøker2.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= firstDate.month());
    }
    throw new Error('År er ikke gyldig');
};

const finnStartEllerSlutt = (year: number, month: number, day: number, perioder: Periode[]) => {
    const date = dayjs().year(year).month(month).date(day);
    const førsteDag = erFørsteDag(date, day, perioder);
    const sisteDag = erSisteDag(date, day, perioder);

    if (førsteDag && sisteDag) {
        return DagIPeriode.FØRSTE_OG_SISTE_DAG;
    }
    if (førsteDag) {
        return DagIPeriode.FØRSTE_DAG;
    }
    if (sisteDag) {
        return DagIPeriode.SISTE_DAG;
    }
    return DagIPeriode.DAG_MELLOM;
};

interface Props {
    startdatoSøker1: Date;
    startdatoSøker2: Dayjs | undefined;
    sluttdatoSøker1: Dayjs;
    sluttdatoSøker2: Dayjs;
    termindatoEllerFødselsdato: string;
    perioder: Periode[];
}

const Calendar: FunctionComponent<Props> = ({
    startdatoSøker1,
    sluttdatoSøker2,
    sluttdatoSøker1,
    startdatoSøker2,
    termindatoEllerFødselsdato,
    perioder,
}) => {
    const years = [...new Set([dayjs(startdatoSøker1).year(), dayjs(sluttdatoSøker2).year()])];
    return (
        <VStack gap="5">
            {years.map((year) => (
                <Year key={year} year={year}>
                    <HStack gap="10">
                        {findMonthsOfYear(year, dayjs(startdatoSøker1), dayjs(sluttdatoSøker2)).map((month) => (
                            <Month key={year + month} year={year} month={month}>
                                {[...Array(dayjs().year(year).month(month).daysInMonth()).keys()].map((day) => (
                                    <Day
                                        key={year + month + day}
                                        day={day - 1}
                                        periodType={finnPeriodeType(
                                            year,
                                            month,
                                            day,
                                            startdatoSøker1,
                                            sluttdatoSøker1,
                                            startdatoSøker2,
                                            sluttdatoSøker2,
                                            dayjs(termindatoEllerFødselsdato),
                                        )}
                                        startEllerSlutt={finnStartEllerSlutt(year, month, day, perioder)}
                                        isFirstDay={day === 0}
                                        isLastDay={day === dayjs().year(year).month(month).daysInMonth() - 1}
                                    />
                                ))}
                            </Month>
                        ))}
                    </HStack>
                </Year>
            ))}
        </VStack>
    );
};

export default Calendar;
