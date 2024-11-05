import { IntlShape } from 'react-intl';

import { textGyldigRegex, textRegex } from '@navikt/fp-validation';

export type SkjemaelementFeil = string | undefined;

export const getIllegalChars = (value: any): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};

export const getIllegalCharsErrorMessage = (value: any, feltNavn: string, intl: IntlShape): string => {
    const ugyldigeTegn = getIllegalChars(value).replace(/\t/g, 'Tabulatortegn');
    return intl.formatMessage(
        { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
        {
            feltNavn: feltNavn,
            ugyldigeTegn: ugyldigeTegn,
        },
    );
};

export const validateTextHasLegalChars = (value: any): boolean => textRegex.test(value);

export const validateTextInputField = (value: any, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
    if (!validateTextHasLegalChars(value)) {
        return getIllegalCharsErrorMessage(value, feltNavn, intl);
    }
    return undefined;
};

export const validateFritekstFelt = (intl: IntlShape, label: string, inputText?: string) => {
    if (inputText === undefined || inputText === null || inputText.length === 0 || inputText.length < 25) {
        return intl.formatMessage({ id: 'valideringsfeil.fritekst.forKort' }, { feltNavn: label });
    }

    if (inputText.length > 1000) {
        return intl.formatMessage({ id: 'valideringsfeil.fritekst.forLang' }, { feltNavn: label });
    }

    return validateTextInputField(inputText, label, intl);
};
