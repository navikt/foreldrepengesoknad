import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

const hasValue = (v: string | undefined | null) => v !== '' && v !== undefined && v !== null;

export const prosentValideringSamtidigUttak = (intl: IntlShape) => (value: string) => {
    const samtidigUttakProsent = getFloatFromString(value);

    if (!hasValue(value)) {
        return intl.formatMessage({ id: 'uttaksplan.validering.samtidigUttaksprosent.required' });
    }

    if (samtidigUttakProsent === undefined) {
        return intl.formatMessage({ id: 'uttaksplan.validering.samtidigUttaksprosent.måVæreEtTall' });
    }

    if (samtidigUttakProsent < 0) {
        return intl.formatMessage({ id: 'uttaksplan.validering.samtidigUttaksprosent.måVæreStørreEnn0' });
    }

    if (samtidigUttakProsent > 100) {
        return intl.formatMessage({ id: 'uttaksplan.validering.samtidigUttaksprosent.måVæreMindreEnn100' });
    }

    return undefined;
};

export const prosentValideringGradering = (intl: IntlShape) => (value: string) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intl.formatMessage({ id: 'uttaksplan.validering.stillingsprosent.required' });
    }

    if (stillingsprosent === undefined) {
        return intl.formatMessage({ id: 'uttaksplan.validering.stillingsprosent.måVæreEtTall' });
    }

    if (stillingsprosent < 0) {
        return intl.formatMessage({ id: 'uttaksplan.validering.stillingsprosent.måVæreStørreEnn0' });
    }

    if (stillingsprosent > 100) {
        return intl.formatMessage({ id: 'uttaksplan.validering.stillingsprosent.måVæreMindreEnn100' });
    }

    return undefined;
};
