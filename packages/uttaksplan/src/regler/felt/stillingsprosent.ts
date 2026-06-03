import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { Feltregel, førsteBrutteFeltregel } from '../types';
import { harIngenVerdi } from './utils';

/**
 * Lager en validator-funksjon som passer rett inn i React Hook Form sin `validate`-prop.
 */
export const lagStillingsprosentValidator =
    (intl: IntlShape, samtidigUttaksprosentValue: string | undefined) =>
    (value: string): string | null => {
        const brutt = førsteBrutteFeltregel(lagStillingsprosentRegler(intl), { value, samtidigUttaksprosentValue });
        return brutt ? brutt.feilmelding : null;
    };

type StillingsprosentInput = {
    value: string;
    samtidigUttaksprosentValue: string | undefined;
};

export const lagStillingsprosentRegler = (intl: IntlShape): ReadonlyArray<Feltregel<StillingsprosentInput>> => [
    {
        id: 'stillingsprosent.påkrevd',
        beskrivelse: 'Stillingsprosent må fylles ut når brukeren skal kombinere arbeid og uttak.',
        erBrutt: ({ value }) => harIngenVerdi(value),
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.påkrevd' }),
    },
    {
        id: 'stillingsprosent.måVæreEtTall',
        beskrivelse: 'Stillingsprosent må være et gyldig tall.',
        erBrutt: ({ value }) => !harIngenVerdi(value) && getFloatFromString(value) === undefined,
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.måVæreEtTall' }),
    },
    {
        id: 'stillingsprosent.måVæreStørreEnn0',
        beskrivelse: 'Stillingsprosent må være større enn 0 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall <= 0;
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.måVæreStørreEnn0' }),
    },
    {
        id: 'stillingsprosent.måVæreMindreEnn100',
        beskrivelse: 'Stillingsprosent må være mindre enn 100 %.',
        erBrutt: ({ value }) => {
            const tall = getFloatFromString(value);
            return tall !== undefined && tall >= 100;
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.måVæreMindreEnn100' }),
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
                stillingsprosent !== undefined && samtidigUttak !== undefined && stillingsprosent + samtidigUttak > 100
            );
        },
        feilmelding: intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.samtidigUttak' }),
    },
];
