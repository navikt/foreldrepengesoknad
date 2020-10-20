import { isISODateString } from 'nav-datovelger';
import { DatoInputVerdi, ValidDatoInputVerdi } from './DatoInput';
import moment from 'moment';

const apiDateFormat = 'YYYY-MM-DD';

const isDate = (input: any): input is Date => {
    return typeof input === 'object' && Object.prototype.toString.call(input) === '[object Date]' ? true : false;
};

const getDateFromDateString = (dateString: string): Date | undefined => {
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

const dateToISOFormattedDateString = (date: Date) => moment(date).format(apiDateFormat);

export const createDatoInputVerdiFromDate = (date: Date): ValidDatoInputVerdi => {
    return createDatoInputVerdi(date) as ValidDatoInputVerdi;
};

export const createDatoInputVerdi = (value: string | Date | undefined): DatoInputVerdi => {
    let date: Date | undefined;
    let dateString = '';

    if (isDate(value)) {
        date = value;
        dateString = dateToISOFormattedDateString(value);
    }
    if (typeof value === 'string') {
        date = getDateFromDateString(value);
        dateString = date ? dateToISOFormattedDateString(date) : value;
    }
    return {
        date,
        dateString,
    };
};
