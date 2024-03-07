import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { getFellesperiodefordelingOptionValues } from 'steps/fordeling/FordelingSteg';
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

const Kalender = () => {
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const termindatoEllerFødselsdato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : omBarnet.fødselsdato;
    if (!termindatoEllerFødselsdato) {
        throw Error('Det er feil i data om barnet. Ingen termindato. (oversikt steg: kalender)');
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
    const konto100tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 200,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const mappedKonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100);
    const mappedKonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80);
    const mappedKonto100tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100tvillinger);
    const mappedKonto80tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80tvillinger);
    const [dekningsgrad, setDekningsgrad] = useState<Dekningsgrad>(Dekningsgrad.HUNDRE_PROSENT);
    console.log(setDekningsgrad);
    const toBarn = omBarnet.hvorMange === 'to';
    const ettBarn = omBarnet.hvorMange === 'ett';

    const finnSelectedKonto = () => {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && ettBarn) {
            return mappedKonto100;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && ettBarn) {
            return mappedKonto80;
        }
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && toBarn) {
            return mappedKonto100tvillinger;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && toBarn) {
            return mappedKonto80tvillinger;
        }
        return mappedKonto100;
    };

    const selectedKonto = finnSelectedKonto();

    /*const selectedKonto = dekningsgrad
        ? dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? mappedKonto100
            : mappedKonto80
        : mappedKonto100;
*/
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate());
    console.log('startdatoSøker1: ', startdatoSøker1);

    const fellesperiodefordeling = notEmpty(useContextGetData(ContextDataType.FORDELING)).fellesperiodefordeling;

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
        { fom: dayjs(startdatoSøker1), tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day') },
        { fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'), tom: dayjs(sluttdatoSøker1).subtract(1, 'day') },
        { fom: dayjs(startdatoSøker2), tom: dayjs(sluttdatoSøker2).subtract(1, 'day') },
    ];
    console.log('perioder: ', perioder);

    const years = [...new Set([dayjs(startdatoSøker1).year(), dayjs(sluttdatoSøker2).year()])];

    return (
        <VStack gap="5">
            {years.map((year) => (
                <Year key={year} year={year}>
                    <HStack gap="10">
                        {findMonthsOfYear(year, dayjs(startdatoSøker1), dayjs(sluttdatoSøker2)).map((month) => (
                            <Month key={month} year={year} month={month}>
                                {[...Array(dayjs().year(year).month(month).daysInMonth()).keys()].map((day) => (
                                    <Day
                                        key="dag"
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
export default Kalender;
