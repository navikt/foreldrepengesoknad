import dayjs from 'dayjs';

export const ISO_DATE_REGEX = /(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const DDMMYYYY_DATE_FORMAT = 'DD.MM.YYYY';
export const DDMMYY_DATE_FORMAT = 'DD.MM.YY';
export const DDMMMMYYY_DATE_FORMAT = 'DD. MMMM YYYY';
export const DDMMM_DATE_FORMAT = 'DD. MMM';
export const TIME_FORMAT = 'HH:mm';
export const WEEKDAY_DDMMMMYYYY_DATE_FORMAT = 'dddd DD. MMMM YYYY';
export const WEEKDAY_DDMMYY_DATE_FORMAT = 'dddd DD.MM.YY';
export const DAY_MONTHNAME_YEAR_FORMAT = 'D. MMMM YYYY';

// TODO Er dette greie datoar eller bør ein velga noko anna?
export const TIDENES_MORGEN = dayjs('1000-01-01').toDate();
export const TIDENES_ENDE = dayjs('9999-31-12').toDate();

export const DATE_TODAY = dayjs().toDate();
export const SIX_MONTHS_AGO = dayjs().subtract(6, 'month').startOf('day').toDate();
export const DATE_1_YEAR_FROM_NOW = dayjs().add(1, 'years').toDate();
export const DATE_1_YEAR_AGO = dayjs().subtract(1, 'years').toDate();
export const DATE_3_YEARS_AGO = dayjs().startOf('days').subtract(3, 'years').startOf('day');
export const DATE_4_YEARS_AGO = dayjs().subtract(4, 'year').startOf('day');

export const DATE_5_MONTHS_AGO = dayjs().subtract(5, 'month').startOf('day').toDate();
export const DATE_20_YEARS_AGO = dayjs().subtract(20, 'years').startOf('day').toDate();
