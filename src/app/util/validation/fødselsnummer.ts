import { InjectedIntl } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { hasValueRule } from './common';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_FNR_LENGTH = 30;

type FødselsnummerValidationResult = false | 'F' | 'D';
const isFødselsnummerFormatValid = (fnr: string): FødselsnummerValidationResult => {
    try {
        return isValidFødselsnummer(fnr, true);
    } catch (e) {
        return false;
    }
};

const isUtenlandskFødselsnummerValid = (fnr: string): boolean => {
    return fnr !== undefined && fnr !== '' && fnr.length <= MAKS_FNR_LENGTH;
};

export const isSixteenOrOlder = (fnr: string, isFødselsnummerValid: FødselsnummerValidationResult): boolean => {
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

export const getFødselsnummerRegler = (
    fnr: string,
    utenlandskFnr: boolean,
    søkersFødselsnummer: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.fødselsnummer';
    const isFødselsnummerValid = isFødselsnummerFormatValid(fnr);
    return [
        hasValueRule(fnr, getMessage(intl, `${intlKey}.required`)),
        {
            test: () =>
                (!utenlandskFnr && isFødselsnummerValid !== false) ||
                (utenlandskFnr === true && isUtenlandskFødselsnummerValid(fnr)),
            failText: getMessage(intl, `${intlKey}.ugyldigFødselsnummer`)
        },
        {
            test: () => søkersFødselsnummer !== fnr,
            failText: getMessage(intl, `${intlKey}.ugyldigEgetFødselsnummer`)
        },
        {
            test: () => (!utenlandskFnr && isSixteenOrOlder(fnr, isFødselsnummerValid)) || utenlandskFnr === true,
            failText: getMessage(intl, `${intlKey}.underSeksten`)
        }
    ];
};
