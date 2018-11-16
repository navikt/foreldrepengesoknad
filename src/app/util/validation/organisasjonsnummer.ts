import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { hasValueRule } from './common';
import { getMod11 } from './mod11';

const onlyNumbersRegExp = /^[0-9]*$/;

export const er9Tall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr) && orgnr.length === 9;
};

export const erGyldigNorskOrgnummer = (orgnr: string): boolean => {
    if (!orgnr || er9Tall(orgnr) === false) {
        return false;
    }
    return parseInt(orgnr.charAt(orgnr.length - 1), 10) === getMod11(orgnr);
};

export const getOrganisasjonsnummerRegler = (
    organisasjonsnummer: string,
    registrertINorge: boolean | undefined,
    intl: InjectedIntl
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
