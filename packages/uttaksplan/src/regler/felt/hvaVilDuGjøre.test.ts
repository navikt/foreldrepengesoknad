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
    nyHvaVilDuGjøre:
        | 'LEGG_TIL_FERIE'
        | 'LEGG_TIL_UTSETTELSE'
        | 'LEGG_TIL_PAUSE'
        | 'LEGG_TIL_OPPHOLD'
        | 'LEGG_TIL_PERIODE'
        | undefined;
    fomValue: string | undefined;
    tomValue: string | undefined;
    perioder: Array<{ fom: string; tom: string }>;
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
    const regler = lagHvaVilDuGjøreRegler(intlMock, input.familiesituasjon);
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

const FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN =
    'Ferie og perioder uten foreldrepenger kan ikke legges til før termin.';
const FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_FØDSEL =
    'Ferie og perioder uten foreldrepenger kan ikke legges til før fødsel.';
const FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_ADOPSJON =
    'Ferie og perioder uten foreldrepenger kan ikke legges til før omsorgsovertakelse.';

describe('hvaVilDuGjøre — ferie/opphold kan ikke legges før familiehendelsesdato', () => {
    it('skal melde feil når «Legg til ferie» er valgt med fom før familiehendelsesdato', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN);
    });

    it('skal melde feil når «Legg til opphold» er valgt med fom før familiehendelsesdato', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_OPPHOLD',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN);
    });

    it('skal melde feil selv om bare deler av perioden er før familiehendelsesdato', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-07-25',
                tomValue: '2024-08-05',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN);
    });

    it('skal ikke melde feil når perioden starter på eller etter familiehendelsesdato', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-09-16',
                tomValue: '2024-09-20',
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal gjelde uansett søker (også far/medmor)', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
                søker: 'FAR_MEDMOR',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN);
    });

    it('skal ikke gjelde for «Legg til utsettelse»', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_UTSETTELSE',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
            }),
        );

        expect(feil).not.toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_TERMIN);
    });

    it('skal bruke riktig ord for fødsel når familiesituasjon er «fødsel»', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
                familiesituasjon: 'fødsel',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_FØDSEL);
    });

    it('skal bruke riktig ord for omsorgsovertakelse når familiesituasjon er «adopsjon»', () => {
        const feil = evaluer(
            lagInput({
                nyHvaVilDuGjøre: 'LEGG_TIL_FERIE',
                fomValue: '2024-07-15',
                tomValue: '2024-07-29',
                familiesituasjon: 'adopsjon',
                søker: 'FAR_MEDMOR',
            }),
        );

        expect(feil).toBe(FERIE_FØR_FAMILIEHENDELSESDATO_FEILMELDING_ADOPSJON);
    });
});
