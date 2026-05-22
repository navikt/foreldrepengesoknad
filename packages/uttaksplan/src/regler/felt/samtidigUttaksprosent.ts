import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { Feltregel, Feltregelområde, førsteBrutteFeltregel, i18n } from '../types';
import { harIngenVerdi } from './utils';

export type SamtidigUttaksprosentInput = {
    value: string;
    stillingsprosentValue: string | undefined;
};

export const SAMTIDIG_UTTAKSPROSENT_REGLER: ReadonlyArray<Feltregel<SamtidigUttaksprosentInput>> = [
    {
        id: 'samtidigUttaksprosent.påkrevd',
        beskrivelse: 'Samtidig uttaksprosent må fylles ut når begge foreldre tar ut foreldrepenger samtidig.',
        erBrutt: ({ value }) => harIngenVerdi(value),
        feilmeldingId: i18n('leggTilPeriodePanel.samtidiguttaksprosent.påkrevd'),
    },
    {
        id: 'samtidigUttaksprosent.måVæreEtTall',
        beskrivelse: 'Samtidig uttaksprosent må være et gyldig tall.',
        erBrutt: ({ value }) => !harIngenVerdi(value) && getFloatFromString(value) === undefined,
        feilmeldingId: i18n('leggTilPeriodePanel.samtidiguttaksprosent.måVæreEtTall'),
    },
    {
        id: 'samtidigUttaksprosent.måVæreStørreEnn0',
        beskrivelse: 'Samtidig uttaksprosent må være større enn 0 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall <= 0;
        },
        feilmeldingId: i18n('leggTilPeriodePanel.samtidiguttaksprosent.måVæreStørreEnn0'),
    },
    {
        id: 'samtidigUttaksprosent.kanIkkeOverstige100',
        beskrivelse: 'Samtidig uttaksprosent kan ikke være større enn 100 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall > 100;
        },
        feilmeldingId: i18n('leggTilPeriodePanel.samtidiguttaksprosent.måVæreMindreEnn100'),
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
                samtidigUttak !== undefined &&
                stillingsprosent !== undefined &&
                stillingsprosent + samtidigUttak > 100
            );
        },
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.samtidigUttak'),
    },
];

export const SAMTIDIG_UTTAKSPROSENT_OMRÅDE: Feltregelområde = {
    id: 'SamtidigUttaksprosent',
    feltnavn: 'Samtidig uttaksprosent',
    beskrivelse:
        'Hvor stor andel av kvoten brukeren tar ut samtidig med den andre forelderen. Reglene sikrer at verdien ' +
        'er et gyldig tall mellom 0 og 100 %, og at summen med stillingsprosent ikke overstiger 100 %.',
    regler: SAMTIDIG_UTTAKSPROSENT_REGLER,
};

export const lagSamtidigUttaksprosentValidator =
    (intl: IntlShape, stillingsprosentValue: string | undefined) =>
    (value: string): string | null => {
        const brutt = førsteBrutteFeltregel(SAMTIDIG_UTTAKSPROSENT_REGLER, { value, stillingsprosentValue });
        return brutt ? intl.formatMessage({ id: brutt.feilmeldingId }) : null;
    };
