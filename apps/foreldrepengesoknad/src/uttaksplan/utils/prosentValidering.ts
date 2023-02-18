import { hasValue, intlUtils } from '@navikt/fp-common';
import { getFloatFromString } from 'app/utils/numberUtils';
import { IntlShape } from 'react-intl';

export const prosentValideringSamtidigUttak = (intl: IntlShape) => (value: string) => {
    const samtidigUttakProsent = getFloatFromString(value);

    if (!hasValue(value)) {
        return intlUtils(intl, 'uttaksplan.validering.samtidigUttaksprosent.required');
    }

    if (samtidigUttakProsent === undefined) {
        return intlUtils(intl, 'uttaksplan.validering.samtidigUttaksprosent.måVæreEtTall');
    }

    if (samtidigUttakProsent < 0) {
        return intlUtils(intl, 'uttaksplan.validering.samtidigUttaksprosent.måVæreStørreEnn0');
    }

    if (samtidigUttakProsent > 100) {
        return intlUtils(intl, 'uttaksplan.validering.samtidigUttaksprosent.måVæreMindreEnn100');
    }

    return undefined;
};

export const prosentValideringGradering = (intl: IntlShape) => (value: string) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'uttaksplan.validering.stillingsprosent.required');
    }

    if (stillingsprosent === undefined) {
        return intlUtils(intl, 'uttaksplan.validering.stillingsprosent.måVæreEtTall');
    }

    if (stillingsprosent < 0) {
        return intlUtils(intl, 'uttaksplan.validering.stillingsprosent.måVæreStørreEnn0');
    }

    if (stillingsprosent > 100) {
        return intlUtils(intl, 'uttaksplan.validering.stillingsprosent.måVæreMindreEnn100');
    }

    return undefined;
};
