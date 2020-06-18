import { Alder, DateValue } from '../../types/common';
import { Tidsperiode } from 'common/types';
import {
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    today,
    tomorrow,
    date15YearsAnd3MonthsAgo,
} from '../validation/values';
import { FamiliehendelseDatoer } from '../../types/søknad/FamiliehendelseDatoer';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { Perioden } from '../uttaksplan/Perioden';

const moment = require('moment');

export interface DateRange {
    from: Date;
    to: Date;
}

export const getRelevantFamiliehendelseDato = ({
    termindato,
    fødselsdato,
    omsorgsovertakelsesdato,
}: FamiliehendelseDatoer): Date => {
    if (fødselsdato !== undefined) {
        return fødselsdato;
    } else {
        return termindato !== undefined ? termindato : omsorgsovertakelsesdato!;
    }
};

export const getEndringstidspunkt = (
    opprinneligPlan: Periode[] | undefined,
    updatedPlan: Periode[],
    erEndringssøknad: boolean
): Date | undefined => {
    if (!erEndringssøknad) {
        return undefined;
    }

    let endringstidspunkt;
    if (opprinneligPlan) {
        endringstidspunkt = updatedPlan.reduce((currentDate, periode, index) => {
            if (index < opprinneligPlan.length) {
                if (currentDate === undefined && !Perioden(periode).erLik(opprinneligPlan[index], true, true)) {
                    return periode.tidsperiode.fom;
                }
            }

            if (
                index === updatedPlan.length - 1 &&
                currentDate === undefined &&
                updatedPlan.length < opprinneligPlan.length
            ) {
                // Siste periode i planen har blitt slettet
                return periode.tidsperiode.tom;
            }

            if (index >= opprinneligPlan.length && currentDate === undefined) {
                return periode.tidsperiode.fom;
            }

            return currentDate;
        }, undefined);
    } else {
        // Bruker har slettet opprinnelig plan, send med alt
        if (updatedPlan.length > 0) {
            return updatedPlan[0].tidsperiode.fom;
        }
    }

    return endringstidspunkt;
};

export const getDateFromString = (dato?: string) => {
    if (dato) {
        return new Date(dato);
    }
    return undefined;
};

export const getAlderFraDato = (fødselsdato: Date): Alder => {
    const idag = moment();
    const dato = moment(fødselsdato);

    const år = idag.diff(dato, 'year');
    dato.add(år, 'years');
    const måneder = idag.diff(dato, 'months');
    dato.add(måneder, 'months');
    const dager = idag.diff(dato, 'days');

    return {
        år,
        måneder,
        dager,
    };
};

export const formatDate = (dato?: Date | string) => {
    if (dato) {
        return moment(dato).isValid() ? moment(dato).format('DD.MM.YYYY') : '';
    }
    return dato;
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};

export const findOldestDate = (dateArray: Date[]): DateValue => {
    if (dateArray.length > 0) {
        return moment.min(dateArray.map((date: Date) => moment(date))).toDate();
    }
    return undefined;
};

export const dateIsNotInFuture = (date: DateValue): boolean => moment(date).isBefore(tomorrow, 'day');
export const dateIsTodayOrInFuture = (date: DateValue): boolean => moment(date).isSameOrAfter(today, 'day');
export const dateIsInThePast = (date: DateValue): boolean => moment(date).isBefore(today, 'day');
export const dateIs3YearsAgoOrLess = (date: DateValue): boolean => moment(date).isSameOrAfter(date3YearsAgo, 'day');
export const dateIs15YearsAnd3MonthsAgoOrLess = (date: DateValue): boolean =>
    moment(date).isSameOrAfter(date15YearsAnd3MonthsAgo, 'day');
export const dateIs1YearAheadOrLess = (date: DateValue): boolean =>
    moment(date).isBetween(today, date1YearAhead, 'day', '[]');
export const dateIs1YearAgoOrLess = (date: DateValue): boolean =>
    moment(date).isBetween(date1YearAgo, today, 'day', '[]');
export const dateIsBetween = (date: DateValue, fom: DateValue, tom: DateValue): boolean =>
    moment(date).isBetween(fom, tom, 'day', '[]');

export const dateIsSameOrBefore = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return moment(date).isSameOrBefore(moment(otherDate, 'day'));
    }
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return moment(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};
export const timeintervalsOverlap = (
    timeinterval: Partial<Tidsperiode>,
    otherTimeintervals: Tidsperiode[]
): boolean => {
    if (timeinterval.fom && timeinterval.tom) {
        return otherTimeintervals.some((t: Tidsperiode) => {
            const fom = moment(timeinterval.fom).startOf('day');
            const tom = moment(timeinterval.tom).endOf('day');
            return (
                fom.isBetween(t.fom, t.tom, 'day', '[]') ||
                tom.isBetween(t.fom, t.tom, 'day', '[]') ||
                (fom.isBefore(t.fom, 'day') && tom.isSameOrAfter(t.fom, 'day')) ||
                (tom.isAfter(t.tom, 'day') && fom.isSameOrBefore(t.tom, 'day'))
            );
        });
    }
    return true;
};

interface ItemWithFom {
    fom: Date;
}

export interface OpenDateRange {
    from: Date;
    to?: Date;
}

const prettyDateFormatExtended = 'DD. MMM YYYY';
export const prettifyDateExtended = (date: Date) => moment(date).format(prettyDateFormatExtended);

export const sortOpenDateRange = (d1: OpenDateRange, d2: OpenDateRange): number => {
    if (moment(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

export const sortItemsByFom = (a: ItemWithFom, b: ItemWithFom) => sortOpenDateRange({ from: a.fom }, { from: b.fom });

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return moment(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (date: Date | undefined, minDate: Date, maxDate: Date) => {
    if (date === undefined) {
        return {
            key: 'påkrevd',
        };
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        return {
            key: 'valideringsfeil.dateOutsideRange',
            values: {
                fom: prettifyDateExtended(minDate),
                tom: prettifyDateExtended(maxDate),
            },
        };
    }

    return undefined;
};

const validateFromDate = (date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate);
    if (error !== undefined) {
        return error;
    }
    if (toDate && moment(date).isAfter(toDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.førTilDato',
        };
    }
    return undefined;
};

const validateToDate = (date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && moment(date).isBefore(fromDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.etterFraDato',
        };
    }
    return undefined;
};

export const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (moment(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

export const dateRangesCollide = (ranges: DateRange[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = ranges.sort(sortDateRange);
        const hasOverlap = ranges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return moment(d.to).isAfter(sortedDates[idx + 1].from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

export const dateRangesExceedsRange = (ranges: DateRange[], allowedRange: DateRange): boolean => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = ranges.sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !moment(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !moment(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')
    ) {
        return true;
    }
    return false;
};
