import { HStack, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs, { Dayjs } from 'dayjs';
import { erBarnetIkkeFødt } from 'types/Barnet';
import Day, { PeriodType } from './Day';
import Month from './Month';
import Year from './Year';

const findMonthsOfYear = (year: number, treUkerFørTerminDato: Dayjs, sluttdato49: Dayjs): number[] => {
    if (treUkerFørTerminDato.year() === year) {
        const endOfYear = treUkerFørTerminDato.endOf('year');
        const lastDate = sluttdato49.isBefore(endOfYear) ? sluttdato49 : endOfYear;
        return [...new Array(lastDate.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= treUkerFørTerminDato.month());
    }
    if (sluttdato49.year() === year) {
        const startOfYear = sluttdato49.startOf('year');
        const firstDate = treUkerFørTerminDato.isAfter(startOfYear) ? treUkerFørTerminDato : startOfYear;
        return [...new Array(sluttdato49.month() + 1)]
            .map((_nr, index) => index)
            .filter((nr) => nr >= firstDate.month());
    }
    throw new Error('År er ikke gyldig');
};

const finnPeriodeType = (
    year: number,
    month: number,
    day: number,
    treUkerFørTerminDato: Dayjs,
    sluttdato49: Dayjs,
    termindato: Dayjs,
) => {
    const date = dayjs().year(year).month(month).date(day);
    if (date.isSame(termindato, 'date')) {
        return PeriodType.TERMINDATO;
    }

    if (date.isBetween(treUkerFørTerminDato, sluttdato49)) {
        return PeriodType.FORELDREPENGER;
    }
    return PeriodType.INGEN;
};

const Kalender = () => {
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const termindato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined;
    if (!termindato) {
        throw Error('Det er feil i data om barnet');
    }

    const treUkerFørTerminDato = dayjs(termindato).subtract(3, 'weeks').startOf('day');
    const sluttdato49 = dayjs(treUkerFørTerminDato).add(46, 'weeks');

    const years = [...new Set([treUkerFørTerminDato.year(), sluttdato49.year()])];

    return (
        <VStack gap="5">
            {years.map((year) => (
                <Year key={year} year={year}>
                    <HStack gap="2">
                        {findMonthsOfYear(year, treUkerFørTerminDato, sluttdato49).map((month) => (
                            <Month key={month} year={year} month={month}>
                                {[...Array(dayjs().year(year).month(month).daysInMonth()).keys()].map((day) => (
                                    <Day
                                        key="dag"
                                        day={day}
                                        periodType={finnPeriodeType(
                                            year,
                                            month,
                                            day,
                                            treUkerFørTerminDato,
                                            sluttdato49,
                                            dayjs(termindato),
                                        )}
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
export default Kalender;
