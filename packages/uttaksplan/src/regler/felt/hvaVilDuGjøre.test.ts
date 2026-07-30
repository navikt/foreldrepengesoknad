import { createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import messages from '../../intl/messages/nb_NO.json';
import { lagHvaVilDuGjøreRegler } from './hvaVilDuGjøre';

const cache = createIntlCache();
const intlMock = createIntl({ locale: 'nb', defaultLocale: 'nb', messages }, cache);

// Torsdag. Seks uker etter blir 2024-09-10.
const FAMILIEHENDELSESDATO = '2024-07-30';

type Input = {
    nyHvaVilDuGjøre: 'LEGG_TIL_FERIE' | 'LEGG_TIL_UTSETTELSE' | 'LEGG_TIL_PAUSE' | 'LEGG_TIL_OPPHOLD' | 'LEGG_TIL_PERIODE' | undefined;
    fomValue: string | undefined;
    tomValue: string | undefined;
    perioder: { fom: string; tom: string }[];
    familiehendelsedato: string;
    familiesituasjon: Familiesituasjon;
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
};

const lagInput = (overrides: Partial<Input> = {}): Input => ({
    nyHvaVilDuGjøre: undefined,
    fomValue: undefined,
    tomValue: undefined,
    perioder: [],
    familiehendelsedato: FAMILIEHENDELSESDATO,
    familiesituasjon: 'termin',
    søker: 'MOR',
    rettighetType: 'BEGGE_RETT',
    ...overrides,
});

const evaluer = (input: Input): string | undefined => {
    const regler = lagHvaVilDuGjøreRegler(intlMock);
    return regler.find((regel) => regel.erBrutt(input))?.feilmelding;
};

const FERIE_MOR_FEILMELDING =
    'Ferie og perioder uten foreldrepenger kan ikke legges til i de første seks ukene etter fødsel/termin. Bruk utsettelse i stedet.';

describe('hvaVilDuGjøre — ferie/opphold kan ikke legges i de første seks ukene for mor', () => {
    it('skal melde feil når mor velger «Legg til ferie» innenfor de første seks ukene', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-08-31',
                tomValue: '2024-09-04',
            }),
        );

        expect(feil).toBe(FERIE_MOR_FEILMELDING);
    });

    it('skal melde feil når mor velger «Legg til opphold» innenfor de første seks ukene', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_OPPHOLD',
                fomValue: '2024-08-31',
                tomValue: '2024-09-04',
            }),
        );

        expect(feil).toBe(FERIE_MOR_FEILMELDING);
    });

    it('skal ikke melde feil når mor velger «Legg til ferie» etter de første seks ukene', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-09-16',
                tomValue: '2024-09-20',
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikke gjelde ved adopsjon', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-08-31',
                tomValue: '2024-09-04',
                familiesituasjon: 'adopsjon',
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikke gjelde for far/medmor', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-08-31',
                tomValue: '2024-09-04',
                søker: 'FAR_MEDMOR',
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikke gjelde for «Legg til utsettelse»', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_UTSETTELSE',
                fomValue: '2024-08-31',
                tomValue: '2024-09-04',
            }),
        );

        expect(feil).toBeUndefined();
    });
});
