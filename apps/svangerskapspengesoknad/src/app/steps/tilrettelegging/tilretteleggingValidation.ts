import { intlUtils } from '@navikt/fp-common';
import { getFloatFromString } from 'app/utils/numberUtils';
import { hasValue } from 'app/utils/validationUtils';
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
