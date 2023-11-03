import dayjs from 'dayjs';

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const DDMMYYYY_DATE_FORMAT = 'DD.MM.YYYY';
export const TIME_FORMAT = 'HH:mm';

// TODO Er dette greie datoar eller bør ein velga noko anna?
export const TIDENES_MORGEN = dayjs('1000-01-01').toDate();
export const TIDENES_ENDE = dayjs('9999-31-12').toDate();

export const DATE_TODAY = dayjs().toDate();
export const SIX_MONTHS_AGO = dayjs().subtract(6, 'month').startOf('day').toDate();
export const DATE_1_YEAR_FROM_NOW = dayjs().add(1, 'years').toDate();
export const DATE_1_YEAR_AGO = dayjs().subtract(1, 'years').toDate();
