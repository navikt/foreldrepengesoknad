import { intlUtils, validateTextInputField } from '@navikt/fp-common';
import { getFloatFromString } from 'app/utils/numberUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, hasValue } from 'app/utils/validationUtils';
import { IntlShape } from 'react-intl';

export const validateStillingsprosent = (intl: IntlShape) => (value: string) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.required');
    }

    if (stillingsprosent === undefined) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreEtTall');
    }

    if (stillingsprosent <= 0) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreStørreEnn0');
    }

    if (stillingsprosent >= 100) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEnn100');
    }

    return undefined;
};

export const validateTilretteleggingstiltak = (intl: IntlShape, label: string) => (value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.påkrevd`);
    }

    if (value.length > TEXT_INPUT_MAX_LENGTH) {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.forLang`);
    }

    if (value.length < TEXT_INPUT_MIN_LENGTH) {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.forKort`);
    }

    return validateTextInputField(value, label, intl);

    return undefined;
};
