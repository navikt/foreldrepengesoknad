import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';

const onlyNumbersRegExp = /^[0-9]*$/;

const harVerdi = (orgnr: string | undefined) => {
    return orgnr !== undefined && orgnr !== '';
};
const er9Tegn = (orgnr: string): boolean => {
    return orgnr.length === 9;
};
const erKunTall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr);
};

export const getOrganisasjonsnummerRegler = (
    organisasjonsnummer: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.organisasjonsnummer';
    return [
        {
            test: () => harVerdi(organisasjonsnummer),
            failText: getMessage(intl, `${intlKey}.required`)
        },
        {
            test: () => er9Tegn(organisasjonsnummer),
            failText: getMessage(intl, `${intlKey}.9tall`)
        },
        {
            test: () => erKunTall(organisasjonsnummer),
            failText: getMessage(intl, `${intlKey}.kunTall`)
        }
    ];
};
