import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { hasValueRule } from './common';
import { getMod11 } from './mod11';

const onlyNumbersRegExp = /^[0-9]*$/;

export const er9Tall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr) && orgnr.length === 9;
};

export const starterPå8Eller9 = (orgnr: string): boolean => {
    return orgnr.charAt(0) === '8' || orgnr.charAt(0) === '9';
};

export const erGyldigNorskOrgnummer = (orgnr: string): boolean => {
    if (!orgnr || er9Tall(orgnr) === false || starterPå8Eller9(orgnr) === false || orgnr === '999999999') {
        return false;
    }
    return getMod11(orgnr) === parseInt(orgnr.charAt(8), 10);
};

export const getOrganisasjonsnummerRegler = (
    organisasjonsnummer: string,
    registrertINorge: boolean | undefined,
    intl: IntlShape
): Validator[] => {
    const intlKey = 'valideringsfeil.organisasjonsnummer';
    if (registrertINorge === true) {
        return [
            hasValueRule(organisasjonsnummer, getMessage(intl, `${intlKey}.required`)),
            {
                test: () => er9Tall(organisasjonsnummer),
                failText: getMessage(intl, `${intlKey}.er9tall`)
            },
            {
                test: () => erGyldigNorskOrgnummer(organisasjonsnummer),
                failText: getMessage(intl, `${intlKey}.erUgyldigOrgNummer`)
            }
        ];
    }
    return [hasValueRule(organisasjonsnummer, getMessage(intl, `${intlKey}.required`))];
};
