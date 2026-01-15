import { IntlShape } from 'react-intl';

import { textGyldigRegex, textRegex } from '@navikt/fp-validation';

//TODO (TOR) Ser ut som funksjonane i denne fila har duplikatar i foreldrepengesoknad. Flytt ut i felles-pakke

type SkjemaelementFeil = string | undefined;

const getIllegalChars = (value: string): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};

const getIllegalCharsErrorMessage = (value: string, feltNavn: string, intl: IntlShape): string => {
    const ugyldigeTegn = getIllegalChars(value).replace(/\t/g, 'Tabulatortegn');
    return intl.formatMessage(
        { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
        {
            feltNavn: feltNavn,
            ugyldigeTegn: ugyldigeTegn,
        },
    );
};

const validateTextHasLegalChars = (value: string): boolean => textRegex.test(value);

const validateTextInputField = (value: string, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
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
