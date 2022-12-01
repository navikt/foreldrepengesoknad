import dayjs from 'dayjs';
import validator from '@navikt/fnrvalidator';

type FødselsnummerValidationResult = false | 'fnr' | 'dnr' | 'hnr';
export const isFødselsnummerFormatValid = (fnr: string): FødselsnummerValidationResult => {
    const result = validator.idnr(fnr);

    if (result.status !== 'valid') {
        return false;
    }

    return result.type;
};

export const isSixteenOrOlder = (fnr: string, isFødselsnummerValid: FødselsnummerValidationResult): boolean => {
    const dato =
        isFødselsnummerValid === 'dnr' ? `${Number(fnr.substr(0, 1)) - 4}${fnr.substr(1, 1)}` : fnr.substr(0, 2);
    const mnd = fnr.substr(2, 2);
    const år = fnr.substr(4, 2);

    let fødselsdato = dayjs(`${dato}-${mnd}-${år}`, 'DD-MM-YY');

    if (fødselsdato.get('year') > dayjs().get('year')) {
        fødselsdato = fødselsdato.subtract(100, 'year');
    }

    if (!fødselsdato.isValid()) {
        return false;
    }

    return fødselsdato.isBefore(dayjs().subtract(16, 'year'), 'day');
};
