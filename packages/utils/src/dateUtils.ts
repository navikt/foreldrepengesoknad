import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

import {
    DAY_MONTHNAME_YEAR_FORMAT,
    DDMMMMYYY_DATE_FORMAT,
    DDMMM_DATE_FORMAT,
    DDMMYYYY_DATE_FORMAT,
    DDMMYY_DATE_FORMAT,
    ISO_DATE_FORMAT,
    TIME_FORMAT,
    WEEKDAY_DDMMMMYYYY_DATE_FORMAT,
    WEEKDAY_DDMMYY_DATE_FORMAT,
} from '@navikt/fp-constants';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

type DateTypes = string | dayjs.Dayjs;

/** --- Formater til string --- */
export const formatDate = (date: DateTypes): string => dayjs(date).format(DDMMYYYY_DATE_FORMAT);
export const formatDateIso = (date: DateTypes): string => dayjs(date).format(ISO_DATE_FORMAT);
export const formatDateShortYear = (date: DateTypes): string => dayjs(date).format(DDMMYY_DATE_FORMAT);
export const formatDateExtended = (date: DateTypes): string => dayjs(date).format(DDMMMMYYY_DATE_FORMAT);
export const formatDateShortMonth = (date: DateTypes): string => dayjs(date).format(DDMMM_DATE_FORMAT);
export const formatTime = (date: DateTypes): string => dayjs(date).format(TIME_FORMAT);
export const formatDateMedUkedag = (date: DateTypes): string => dayjs(date).format(WEEKDAY_DDMMMMYYYY_DATE_FORMAT);
export const formatDateMedUkedagShortMonth = (date: DateTypes): string =>
    dayjs(date).format(WEEKDAY_DDMMYY_DATE_FORMAT);
export const formaterDatoUtenDag = (dato: DateTypes): string => dayjs(dato).format(DAY_MONTHNAME_YEAR_FORMAT);

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

export const isISODateString = (value: string | undefined): value is string => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

export const ISOStringToDate = (dateString: string | undefined) => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: DateTypes) => (date ? dayjs(date).format(isoStringFormat) : '');

export const erMyndig = (fødselsdato: DateTypes): boolean => {
    const now = dayjs.utc();
    const date = dayjs.utc(fødselsdato);
    return now.diff(date, 'years') >= 18;
};

export const dateIsSameOrBefore = (date: DateTypes | undefined, otherDate: DateTypes | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(otherDate, 'day');
    }
    return false;
};

export const dateStringIsSameOrBefore = (date: string | undefined, otherDate: string | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(otherDate, 'day');
    }
    return false;
};

export const dateIsSameOrAfter = (date: DateTypes | undefined, otherDate: DateTypes | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return false;
};

export const dateStringIsSameOrAfter = (date: string | undefined, otherDate: string | undefined): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return false;
};
