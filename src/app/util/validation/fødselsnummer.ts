import { InjectedIntl } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { hasValueRule } from './common';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_FNR_LENGTH = 30;

const isFødselsnummerFormatValid = (fnr: string): boolean => {
    try {
        return isValidFødselsnummer(fnr);
    } catch (e) {
        return false;
    }
};

const isUtenlandskFødselsnummerValid = (fnr: string): boolean => {
    return fnr === undefined || fnr === '' || fnr.length <= MAKS_FNR_LENGTH;
};

const erOverSeksten = (fnr: string): boolean => {
    const dato = fnr.substr(0, 2);
    const mnd = fnr.substr(2, 2);
    const år = fnr.substr(4, 2);
    const fødselsdato = moment(`${dato}-${mnd}-${år}`, 'DD-MM-YY');
    return fødselsdato.isBefore(moment().subtract(16, 'year'));
};

export const getFødselsnummerRegler = (
    fnr: string,
    utenlandskFnr: boolean,
    søkersFødselsnummer: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.fødselsnummer';
    return [
        hasValueRule(fnr, getMessage(intl, `${intlKey}.required`)),
        {
            test: () =>
                (!utenlandskFnr && isFødselsnummerFormatValid(fnr)) ||
                (utenlandskFnr === true && isUtenlandskFødselsnummerValid(fnr)),
            failText: getMessage(intl, `${intlKey}.ugyldigFødselsnummer`)
        },
        {
            test: () => søkersFødselsnummer !== fnr,
            failText: getMessage(intl, `${intlKey}.ugyldigEgetFødselsnummer`)
        },
        {
            test: () => (!utenlandskFnr && erOverSeksten(fnr)) || utenlandskFnr === true,
            failText: getMessage(intl, `${intlKey}.underSeksten`)
        }
    ];
};
