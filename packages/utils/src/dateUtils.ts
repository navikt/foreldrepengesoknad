import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

import {
    DATE_TODAY,
    DDMMMMYYY_DATE_FORMAT,
    DDMMYYYY_DATE_FORMAT,
    ISO_DATE_FORMAT,
    ISO_DATE_REGEX,
    TIME_FORMAT,
    WEEKDAY_DDMMMMYYYY_DATE_FORMAT,
} from '@navikt/fp-constants';
import { DAY_MONTHNAME_YEAR_FORMAT } from '@navikt/fp-constants/src/dates';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

type DateTypes = string | Date | dayjs.Dayjs;
type Period = { from: DateTypes; to: DateTypes };

/** --- Formater til string --- */
export const formatDate = (date: DateTypes): string => dayjs(date).format(DDMMYYYY_DATE_FORMAT);
export const formatDateIso = (date: DateTypes): string => dayjs(date).format(ISO_DATE_FORMAT);
export const formatDateExtended = (date: DateTypes): string => dayjs(date).format(DDMMMMYYY_DATE_FORMAT);
export const formatTime = (date: DateTypes): string => dayjs(date).format(TIME_FORMAT);
export const formatDateMedUkedag = (date: Date | string) => dayjs(date).format(WEEKDAY_DDMMMMYYYY_DATE_FORMAT);
export const formaterDatoUtenDag = (dato: string | Date): string => dayjs(dato).format(DAY_MONTHNAME_YEAR_FORMAT);

/** --- Finn dato relativt til gitt dato --- */
export const dagenFør = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day');
export const treUkerSiden = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').subtract(3, 'weeks');
export const fireUkerSiden = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').subtract(4, 'weeks');
export const enMånedSiden = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').subtract(1, 'month');
export const femMånederSiden = (): Dayjs => dayjs().startOf('day').subtract(5, 'month');
export const tiMånederSidenDato = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').subtract(10, 'month');
export const etÅrSiden = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').subtract(1, 'year').add(1, 'day');
export const halvannetÅrSiden = (dato: DateTypes): Dayjs =>
    dayjs(dato).startOf('day').subtract(1, 'year').subtract(6, 'months');
export const niMånederFremITid = (dato: DateTypes): Dayjs => dayjs(dato).startOf('day').add(9, 'months');

// TODO (TOR) Flytt valideringer til pakke validation (lag date-fil under other)
/** --- Valider dato(er) --- */
export const isValidDate = (date?: string): boolean => !!date && dayjs(date).isValid() && ISO_DATE_REGEX.test(date);
export const isToday = (date: DateTypes): boolean => dayjs(date).isSame(DATE_TODAY, 'day');
export const isAfterToday = (date: DateTypes): boolean => dayjs(date).isAfter(DATE_TODAY, 'day');
export const isBeforeToday = (date: DateTypes): boolean => dayjs(date).isBefore(DATE_TODAY, 'day');
export const isSameOrAfterToday = (date: DateTypes): boolean => dayjs(date).isSameOrAfter(DATE_TODAY, 'day');
export const isSameOrBeforeToday = (date: DateTypes): boolean => dayjs(date).isSameOrBefore(DATE_TODAY, 'day');
export const isDateASameOrBeforeDateB = (dateA: DateTypes, dateB: DateTypes): boolean =>
    dayjs(dateA).isSameOrBefore(dateB, 'day');
export const isDateAAfterDateB = (dateA: DateTypes, dateB: DateTypes): boolean => dayjs(dateA).isAfter(dateB, 'day');
export const isDateWithinRange = (date: DateTypes, minDate: DateTypes, maxDate: DateTypes): boolean =>
    dayjs(date).isBetween(minDate, maxDate, 'day', '[]');

const sortDateRange = (d1: Period, d2: Period): number => {
    return dayjs(d1.from).isSameOrBefore(d2.from) ? -1 : 1;
};

export const isDateRangesOverlapping = (ranges: Period[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = [...ranges].sort(sortDateRange);
        const hasOverlap = sortedDates.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

export const isISODateString = (value: any): value is string => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

export const erMyndig = (fødselsdato: DateTypes): boolean => {
    const now = dayjs.utc();
    const momentDate = dayjs.utc(fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

export const dateIsSameOrBefore = (date: Date | undefined, otherDate: Date | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(otherDate, 'day');
    }
    return false;
};
export const dateIsSameOrAfter = (date: Date | undefined, otherDate: Date | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return false;
};
