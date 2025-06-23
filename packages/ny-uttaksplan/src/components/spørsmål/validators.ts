import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

const hasValue = (v: string | number | boolean | undefined | null) => v !== '' && v !== undefined && v !== null;

export const prosentValideringGradering =
    (intl: IntlShape, samtidiguttaksprosentValue: string | undefined) => (value: string) => {
        const stillingsprosent = getFloatFromString(value);
        const samtidiguttaksprosent = getFloatFromString(samtidiguttaksprosentValue);

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

        if (stillingsprosent >= 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodeModal.stillingsprosent.måVæreMindreEnn100',
            });
        }

        if (samtidiguttaksprosent !== undefined && stillingsprosent + samtidiguttaksprosent > 100) {
            return 'Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt';
        }

        return undefined;
    };

export const valideringSamtidigUttak =
    (intl: IntlShape, stillingsprosentValue: string | undefined) => (value: string) => {
        const samtidiguttaksprosent = getFloatFromString(value);
        const stillingsprosent = getFloatFromString(stillingsprosentValue);

        if (!hasValue(value) || value.trim() === '') {
            return intl.formatMessage({ id: 'leggTilPeriodeModal.samtidiguttaksprosent.påkrevd' });
        }

        if (samtidiguttaksprosent === undefined) {
            return intl.formatMessage({
                id: 'leggTilPeriodeModal.samtidiguttaksprosent.måVæreEtTall',
            });
        }

        if (samtidiguttaksprosent <= 0) {
            return intl.formatMessage({
                id: 'leggTilPeriodeModal.samtidiguttaksprosent.måVæreStørreEnn0',
            });
        }

        if (samtidiguttaksprosent > 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodeModal.samtidiguttaksprosent.måVæreMindreEnn100',
            });
        }

        if (stillingsprosent !== undefined && stillingsprosent + samtidiguttaksprosent > 100) {
            return 'Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt';
        }

        return undefined;
    };
