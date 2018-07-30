import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
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
    return fnr !== undefined && fnr !== '' && fnr.length <= MAKS_FNR_LENGTH;
};

export const getFødselsnummerRegler = (
    fnr: string,
    utenlandskFnr: boolean,
    søkersFødselsnummer: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.fødselsnummer';
    return [
        {
            test: () =>
                (!utenlandskFnr && isFødselsnummerFormatValid(fnr)) ||
                (utenlandskFnr && isUtenlandskFødselsnummerValid(fnr)),
            failText: getMessage(intl, `${intlKey}.ugyldigFødselsnummer`)
        },
        {
            test: () => søkersFødselsnummer !== fnr,
            failText: getMessage(intl, `${intlKey}.ugyldigEgetFødselsnummer`)
        }
    ];
};
