import { IntlShape } from 'react-intl';

import { getIllegalChars, textRegex } from '@navikt/fp-validation';

type SkjemaelementFeil = string | null;

const validateTextInputField = (value: string, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
    if (!textRegex.test(value)) {
        const ugyldigeTegn = getIllegalChars(value).replaceAll('\t', 'Tabulatortegn');
        return intl.formatMessage(
            { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
            { feltNavn, ugyldigeTegn },
        );
    }
    return null;
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
