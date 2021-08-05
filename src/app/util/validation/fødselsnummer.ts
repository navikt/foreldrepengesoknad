import moment from 'moment';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_FNR_LENGTH = 30;

type FødselsnummerValidationResult = false | 'F' | 'D';
export const isFødselsnummerFormatValid = (fnr: string): FødselsnummerValidationResult => {
    try {
        return isValidFødselsnummer(fnr, true);
    } catch (e) {
        return false;
    }
};

export const isUtenlandskFødselsnummerValid = (fnr: string): boolean => {
    return fnr !== undefined && fnr !== '' && fnr.length <= MAKS_FNR_LENGTH;
};

export const isSixteenOrOlder = (fnr: string, isFødselsnummerValid: FødselsnummerValidationResult): boolean => {
    if (!fnr) {
        return true;
    }

    const dato = isFødselsnummerValid === 'D' ? `${Number(fnr.substr(0, 1)) - 4}${fnr.substr(1, 1)}` : fnr.substr(0, 2);
    const mnd = fnr.substr(2, 2);
    const år = fnr.substr(4, 2);

    const fødselsdato = moment(`${dato}-${mnd}-${år}`, 'DD-MM-YY');

    if (fødselsdato.get('year') > moment().get('year')) {
        fødselsdato.subtract(100, 'year');
    }

    if (!fødselsdato.isValid()) {
        return false;
    }

    return fødselsdato.isBefore(moment().subtract(16, 'year'));
};
