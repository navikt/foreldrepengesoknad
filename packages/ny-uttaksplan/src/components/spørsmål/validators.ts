import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const prosentValideringGradering = (intl: IntlShape) => (value: string) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intl.formatMessage({ id: 'leggTilPeriodeModal.stillingsprosent.påkrevd' });
    }

    if (stillingsprosent === undefined) {
        return intl.formatMessage({
            id: 'leggTilPeriodeModal.stillingsprosent.måVæreEtTall',
        });
    }

    if (stillingsprosent <= 0) {
        return intl.formatMessage({
            id: 'leggTilPeriodeModal.stillingsprosent.måVæreStørreEnn0',
        });
    }

    if (stillingsprosent > 100) {
        return intl.formatMessage({
            id: 'leggTilPeriodeModal.stillingsprosent.måVæreMindreEnn100',
        });
    }

    return undefined;
};
