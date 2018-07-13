import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { AnnenForelderPartial } from '../../types/søknad/AnnenForelder';
const isValidFødselsnummer = require('is-valid-fodselsnummer');

const MAKS_FNR_LENGTH = 30;

export const getFødselsnummerRegler = (
    annenForelder: AnnenForelderPartial,
    søkersFødselsnummer: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.fødselsnummer';
    return [
        {
            test: () => {
                let result = true;
                if (!annenForelder.utenlandskFnr) {
                    try {
                        result = isValidFødselsnummer(annenForelder.fnr);
                    } catch (e) {
                        result = false;
                    }
                } else {
                    result =
                        annenForelder.fnr !== undefined &&
                        annenForelder.fnr !== '' &&
                        annenForelder.fnr.length <= MAKS_FNR_LENGTH;
                }
                return result;
            },
            failText: getMessage(intl, `${intlKey}.ugyldigFødselsnummer`)
        },
        {
            test: () => søkersFødselsnummer !== annenForelder.fnr,
            failText: getMessage(intl, `${intlKey}.ugyldigEgetFødselsnummer`)
        }
    ];
};
