import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { Feltregel, Feltregelområde, førsteBrutteFeltregel, i18n } from '../types';
import { harIngenVerdi } from './utils';

export type StillingsprosentInput = {
    value: string;
    samtidigUttaksprosentValue: string | undefined;
};

export const STILLINGSPROSENT_REGLER: ReadonlyArray<Feltregel<StillingsprosentInput>> = [
    {
        id: 'stillingsprosent.påkrevd',
        beskrivelse: 'Stillingsprosent må fylles ut når brukeren skal kombinere arbeid og uttak.',
        erBrutt: ({ value }) => harIngenVerdi(value),
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.påkrevd'),
    },
    {
        id: 'stillingsprosent.måVæreEtTall',
        beskrivelse: 'Stillingsprosent må være et gyldig tall.',
        erBrutt: ({ value }) => !harIngenVerdi(value) && getFloatFromString(value) === undefined,
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.måVæreEtTall'),
    },
    {
        id: 'stillingsprosent.måVæreStørreEnn0',
        beskrivelse: 'Stillingsprosent må være større enn 0 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall <= 0;
        },
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.måVæreStørreEnn0'),
    },
    {
        id: 'stillingsprosent.måVæreMindreEnn100',
        beskrivelse: 'Stillingsprosent må være mindre enn 100 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall >= 100;
        },
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.måVæreMindreEnn100'),
    },
    {
        id: 'stillingsprosent.sumMedSamtidigUttakMaks100',
        beskrivelse:
            'Summen av stillingsprosent og samtidig uttaksprosent kan ikke overstige 100 %, fordi brukeren ' +
            'ikke kan arbeide og ta ut foreldrepenger til sammen mer enn full tid.',
        erBrutt: ({ value, samtidigUttaksprosentValue }) => {
            const stillingsprosent = getFloatFromString(value);
            const samtidigUttak = getFloatFromString(samtidigUttaksprosentValue);
            return (
                stillingsprosent !== undefined &&
                samtidigUttak !== undefined &&
                stillingsprosent + samtidigUttak > 100
            );
        },
        feilmeldingId: i18n('leggTilPeriodePanel.stillingsprosent.samtidigUttak'),
    },
];

export const STILLINGSPROSENT_OMRÅDE: Feltregelområde = {
    id: 'Stillingsprosent',
    feltnavn: 'Stillingsprosent',
    beskrivelse:
        'Hvor stor andel brukeren skal jobbe når arbeid kombineres med uttak. Reglene sikrer at verdien er ' +
        'et gyldig tall mellom 0 og 100 %, og at summen med samtidig uttak ikke overstiger 100 %.',
    regler: STILLINGSPROSENT_REGLER,
};

/**
 * Lager en validator-funksjon som passer rett inn i React Hook Form sin `validate`-prop.
 */
export const lagStillingsprosentValidator =
    (intl: IntlShape, samtidigUttaksprosentValue: string | undefined) =>
    (value: string): string | null => {
        const brutt = førsteBrutteFeltregel(STILLINGSPROSENT_REGLER, { value, samtidigUttaksprosentValue });
        return brutt ? intl.formatMessage({ id: brutt.feilmeldingId }) : null;
    };
