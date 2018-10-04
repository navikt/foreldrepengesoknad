import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';

const onlyNumbersRegExp = /^[0-9]*$/;

const harVerdi = (orgnr: string | undefined) => {
    return orgnr !== undefined && orgnr !== '';
};
const er9Tall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr) && orgnr.length === 9;
};

export const getOrganisasjonsnummerRegler = (
    organisasjonsnummer: string,
    registrertINorge: boolean | undefined,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.organisasjonsnummer';
    if (registrertINorge === true) {
        return [
            {
                test: () => harVerdi(organisasjonsnummer),
                failText: getMessage(intl, `${intlKey}.required`)
            },
            {
                test: () => er9Tall(organisasjonsnummer),
                failText: getMessage(intl, `${intlKey}.er9tall`)
            }
        ];
    }
    return [
        {
            test: () => harVerdi(organisasjonsnummer),
            failText: getMessage(intl, `${intlKey}.required`)
        }
    ];
};
