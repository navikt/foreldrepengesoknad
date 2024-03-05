import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { getFellesperiodefordelingOptionValues } from 'steps/periode/PeriodeSteg';
import { erBarnetIkkeFødt } from 'types/Barnet';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { HStack, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import Day, { DagIPeriode, PeriodType } from './Day';
import Month from './Month';
import Year from './Year';

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

type Periode = {
    fom: Dayjs;
    tom: Dayjs;
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

const finnPeriodeType = (
    year: number,
    month: number,
    day: number,
    startdatoSøker1: Dayjs,
    sluttdatoSøker1: Dayjs,
    startdatoSøker2: Dayjs,
    sluttdatoSøker2: Dayjs,
    termindato: Dayjs,
) => {
    const date = dayjs().year(year).month(month).date(day);

    if (date.isBefore(startdatoSøker1) || date.isAfter(sluttdatoSøker2)) {
        return PeriodType.INGEN;
    }
    if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        return PeriodType.HELGEDAG;
    }
    if (date.isSame(termindato, 'date')) {
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

const Kalender = () => {
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const termindato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined;
    if (!termindato) {
        throw Error('Det er feil i data om barnet');
    }
    // TODO: hent fra api
    const konto100 = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80 = {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const [dekningsgrad, setDekningsgrad] = useState<Dekningsgrad>(Dekningsgrad.HUNDRE_PROSENT);
    console.log('dekningsgrad: ', setDekningsgrad);

    const mappedKonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100);
    const mappedKonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80);

    const selectedKonto = dekningsgrad
        ? dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? mappedKonto100
            : mappedKonto80
        : mappedKonto100;

    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());
    console.log('startdatoSøker1: ', startdatoSøker1);

    const fellesperiodefordeling = notEmpty(useContextGetData(ContextDataType.PERIODE)).fellesperiodefordeling;

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);

    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    console.log('antallUkerFellesperiodeSøker1: ', antallUkerFellesperiodeSøker1);
    console.log('fellesperiodefordeling: ', fellesperiodefordeling);

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    console.log('sluttdatoSøker1: ', sluttdatoSøker1);

    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;

    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks');

    console.log('startdatoSøker2: ', startdatoSøker2);
    console.log('sluttdatoSøker2: ', sluttdatoSøker2);
    const sluttdatoForeldrepenger = startdatoSøker1
        ? dayjs(startdatoSøker1)
              .add(antallUkerMødrekvote, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .add(antallUkerFellesperiode, 'weeks')
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    console.log('sluttdatoForeldrepenger: ', sluttdatoForeldrepenger);

    const perioder = [
        { fom: dayjs(startdatoSøker1), tom: dayjs(termindato).subtract(1, 'day') },
        { fom: dayjs(termindato).add(1, 'day'), tom: dayjs(sluttdatoSøker1).subtract(1, 'day') },
        { fom: dayjs(startdatoSøker2), tom: dayjs(sluttdatoSøker2).subtract(1, 'day') },
    ];
    console.log('perioder: ', perioder);

    const years = [...new Set([dayjs(startdatoSøker1).year(), dayjs(sluttdatoSøker2).year()])];

    return (
        <VStack gap="5">
            {years.map((year) => (
                <Year key={year} year={year}>
                    <HStack gap="2">
                        {findMonthsOfYear(year, dayjs(startdatoSøker1), dayjs(sluttdatoSøker2)).map((month) => (
                            <Month key={month} year={year} month={month}>
                                {[...Array(dayjs().year(year).month(month).daysInMonth()).keys()].map((day) => (
                                    <Day
                                        key="dag"
                                        day={day}
                                        periodType={finnPeriodeType(
                                            year,
                                            month,
                                            day,
                                            dayjs(startdatoSøker1),
                                            dayjs(sluttdatoSøker1),
                                            dayjs(startdatoSøker2),
                                            dayjs(sluttdatoSøker2),
                                            dayjs(termindato),
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
export default Kalender;
