import { idnr } from '@navikt/fnrvalidator';
import dayjs from 'dayjs';

type FødselsnummerValidationResult = false | 'dnr' | 'fnr' | 'hnr' | 'tnr' | 'dnr-and-hnr' | 'dnr-and-tnr';
export const isFødselsnummerFormatValid = (fnr: string): FødselsnummerValidationResult => {
    const result = idnr(fnr);

    if (result.status !== 'valid') {
        return false;
    }

    return result.type;
};

export const isSixteenOrOlder = (fnr: string, isFødselsnummerValid: FødselsnummerValidationResult): boolean => {
    const dato = isFødselsnummerValid === 'dnr' ? `${Number(fnr.slice(0, 1)) - 4}${fnr.slice(1, 2)}` : fnr.slice(0, 2);
    const mnd = fnr.slice(2, 4);
    const år = fnr.slice(4, 6);

    let fødselsdato = dayjs(`${dato}-${mnd}-${år}`, 'DD-MM-YY');

    if (fødselsdato.get('year') > dayjs().get('year')) {
        fødselsdato = fødselsdato.subtract(100, 'year');
    }

    if (!fødselsdato.isValid()) {
        return false;
    }

    return fødselsdato.isBefore(dayjs().subtract(16, 'year'), 'day');
};
