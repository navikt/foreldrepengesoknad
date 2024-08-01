import { format, isValid } from 'date-fns';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

/** YYYY-MM-DD */
export type ISODateString = string;

/** DD-MM-YYYY */
export type InputDateString = string;

/** Type used when input date is invalid  */
export type INVALID_DATE_TYPE = 'Invalid date';

export const INVALID_DATE_VALUE = 'Invalid date';
export const INPUT_DATE_STRING_FORMAT: InputDateString = 'DD.MM.YYYY';
export const ISO_DATE_STRING_FORMAT: ISODateString = 'YYYY-MM-DD';
export const ISO_DATE_STRING_FORMAT_date_fns: ISODateString = 'yyyy-MM-dd';

const ALLOWED_INPUT_FORMATS = [
    INPUT_DATE_STRING_FORMAT,
    'DDMMYYYY',
    'DD/MM/YYYY',
    'DD-MM-YYYY',
    'DDMMYY',
    'D.M.YY',
    'DD.MM.YY',
    'D.M.YYYY',
];

const stringToUTCDate = (dateString: string | undefined, formatString: string): Date | undefined => {
    if (dateString?.trim?.()?.length === 10) {
        const d = dayjs(dateString, formatString).utc(true);
        return d.isValid() ? d.toDate() : undefined;
    }
    return undefined;
};

const dateToInputDateString = (date?: Date): InputDateString | INVALID_DATE_TYPE =>
    date ? dayjs.utc(date).format(INPUT_DATE_STRING_FORMAT) : INVALID_DATE_VALUE;

export const dateToISODateString = (date: Date): ISODateString | INVALID_DATE_TYPE => {
    return isValid(date) ? format(date, ISO_DATE_STRING_FORMAT_date_fns) : date.toString();
};

export const ISODateStringToUTCDate = (isoDateString?: ISODateString): Date | undefined => {
    return stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
};

export const InputDateStringToUTCDate = (inputDateString?: InputDateString): Date | undefined => {
    return stringToUTCDate(inputDateString, INPUT_DATE_STRING_FORMAT);
};

export const ISODateStringToInputDateString = (isoDateString: ISODateString): InputDateString | INVALID_DATE_TYPE => {
    const date = stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
    const stringValue = date ? dateToInputDateString(date) : INVALID_DATE_VALUE;
    return stringValue === INVALID_DATE_VALUE ? INVALID_DATE_VALUE : stringValue;
};

const twoDigitYearFormats = ['DDMMYY', 'D.M.YY', 'DD.MM.YY'];
const hasTwoDigitYear = (dateString: string) => {
    return dayjs(dateString, twoDigitYearFormats, true).isValid();
};

const extractTwoDigitYear = (dateString: string) => {
    return dateString.slice(-2);
};

const appendCenturyToTwoYearDigitDateString = (dateString: string, century: '19' | '20') => {
    const twoDigitYear = extractTwoDigitYear(dateString);
    return `${dateString.slice(0, dateString.length - 2)}${century}${twoDigitYear}`;
};

const date80YearsAgo = dayjs().subtract(80, 'year');

const assignCenturyToDateWithTwoYearDigits = (dateString: string) => {
    const twoDigitYearFormatsWith4YearDigits = ['DDMMYYYY', 'D.M.YYYY', 'DD.MM.YYYY'];

    const dateStringIn20thCentury = appendCenturyToTwoYearDigitDateString(dateString, '19');
    const dateIn20thCentury = dayjs(dateStringIn20thCentury, twoDigitYearFormatsWith4YearDigits, true).utc(true);

    const dateStringIn21stCentury = appendCenturyToTwoYearDigitDateString(dateString, '20');
    const dateIn21stCentury = dayjs(dateStringIn21stCentury, twoDigitYearFormatsWith4YearDigits, true).utc(true);

    if (dateIn20thCentury.isValid() && dateIn21stCentury.isValid()) {
        if (dateIn20thCentury.isBefore(date80YearsAgo)) {
            return dateToISODateString(dateIn21stCentury.toDate());
        } else {
            return dateToISODateString(dateIn20thCentury.toDate());
        }
    }
    return INVALID_DATE_VALUE;
};

export const InputDateStringToISODateString = (inputDateString: InputDateString): string | INVALID_DATE_TYPE => {
    if (hasTwoDigitYear(inputDateString)) {
        return assignCenturyToDateWithTwoYearDigits(inputDateString);
    }

    const date = dayjs(inputDateString, ALLOWED_INPUT_FORMATS, true).utc(true);
    return date.isValid() ? dateToISODateString(date.toDate()) : INVALID_DATE_VALUE;
};
