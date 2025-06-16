import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { Planperiode } from '../../types/Planperiode';
import { Periodene } from '../../utils/Periodene';

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

    if (stillingsprosent >= 100) {
        return intl.formatMessage({
            id: 'leggTilPeriodeModal.stillingsprosent.måVæreMindreEnn100',
        });
    }

    return undefined;
};

export const valideringSamtidigUttak =
    (intl: IntlShape, fom: string, tom: string, perioder: Planperiode[]) => (value: string) => {
        const samtidiguttaksprosent = getFloatFromString(value);
        const test = Periodene(perioder).finnOverlappendePerioder({ fom, tom } as Planperiode);
        console.log(test);

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

        if (samtidiguttaksprosent >= 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodeModal.samtidiguttaksprosent.måVæreMindreEnn100',
            });
        }

        return undefined;
    };
