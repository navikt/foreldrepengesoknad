import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { Feltregel, førsteBrutteFeltregel } from '../types';
import { harIngenVerdi } from './utils';

export const lagSamtidigUttaksprosentValidator =
    (intl: IntlShape, stillingsprosentValue: string | undefined) =>
    (value: string): string | null => {
        const brutt = førsteBrutteFeltregel(lagSamtidigUttaksprosentRegler(intl), { value, stillingsprosentValue });
        return brutt ? brutt.feilmelding : null;
    };

type SamtidigUttaksprosentInput = {
    value: string;
    stillingsprosentValue: string | undefined;
};

export const lagSamtidigUttaksprosentRegler = (
    intl: IntlShape,
): ReadonlyArray<Feltregel<SamtidigUttaksprosentInput>> => [
    {
        id: 'samtidigUttaksprosent.påkrevd',
        beskrivelse: 'Samtidig uttaksprosent må fylles ut når begge foreldre tar ut foreldrepenger samtidig.',
        erBrutt: ({ value }) => harIngenVerdi(value),
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.samtidiguttaksprosent.påkrevd' }),
    },
    {
        id: 'samtidigUttaksprosent.måVæreEtTall',
        beskrivelse: 'Samtidig uttaksprosent må være et gyldig tall.',
        erBrutt: ({ value }) => !harIngenVerdi(value) && getFloatFromString(value) === undefined,
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreEtTall' }),
    },
    {
        id: 'samtidigUttaksprosent.måVæreStørreEnn0',
        beskrivelse: 'Samtidig uttaksprosent må være større enn 0 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall <= 0;
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreStørreEnn0' }),
    },
    {
        id: 'samtidigUttaksprosent.kanIkkeOverstige100',
        beskrivelse: 'Samtidig uttaksprosent kan ikke være større enn 100 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall > 100;
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreMindreEnn100' }),
    },
    {
        id: 'samtidigUttaksprosent.sumMedStillingsprosentMaks100',
        beskrivelse:
            'Summen av samtidig uttaksprosent og stillingsprosent kan ikke overstige 100 %, fordi brukeren ' +
            'ikke kan arbeide og ta ut foreldrepenger til sammen mer enn full tid.',
        erBrutt: ({ value, stillingsprosentValue }) => {
            const samtidigUttak = getFloatFromString(value);
            const stillingsprosent = getFloatFromString(stillingsprosentValue);
            return (
                samtidigUttak !== undefined && stillingsprosent !== undefined && stillingsprosent + samtidigUttak > 100
            );
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.samtidigUttak' }),
    },
];
