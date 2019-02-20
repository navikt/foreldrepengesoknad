import { Alder, DateValue } from '../../types/common';
import { Tidsperiode } from 'common/types';
import {
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    today,
    tomorrow,
    date15YearsAnd3MonthsAgo
} from '../validation/values';
const moment = require('moment');

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
        dager
    };
};

export const formatDate = (dato?: Date | string) => {
    if (dato) {
        const parsetDato = moment.utc(dato);
        return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
    }
    return dato;
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};

export const findOldestDate = (dateArray: Date[]): DateValue => {
    if (dateArray.length > 0) {
        return moment.max(dateArray.map((date: Date) => moment(date))).toDate();
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
                fom.isBetween(t.fom, t.tom, 'day', []) ||
                tom.isBetween(t.fom, t.tom, 'day', []) ||
                (fom.isBefore(t.fom, 'day') && tom.isSameOrAfter(t.fom, 'day')) ||
                (tom.isAfter(t.tom, 'day') && fom.isSameOrBefore(t.tom, 'day'))
            );
        });
    }
    return true;
};
