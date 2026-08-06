import { describe, expect, it } from 'vitest';

import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { Periode } from '../types';
import {
    VIS_LEGG_TIL_FERIE_VALG,
    VIS_LEGG_TIL_OPPHOLD_VALG,
    VIS_LEGG_TIL_PAUSE_VALG,
    VIS_LEGG_TIL_UTSETTELSE_VALG,
} from './hvaVilDuGjøreValg';

// Torsdag. Seks uker etter blir 2024-09-10.
const FAMILIEHENDELSESDATO = '2024-07-30';

type Kontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    valgtePerioder: Periode[];
};

const lagKontekst = (overrides: Partial<Kontekst> = {}): Kontekst => ({
    søker: 'MOR',
    rettighetType: 'BEGGE_RETT',
    familiesituasjon: 'termin',
    familiehendelsedato: FAMILIEHENDELSESDATO,
    valgtePerioder: [],
    ...overrides,
});

describe('hvaVilDuGjøreValg', () => {
    describe('mor med periode innenfor de første seks ukene etter familiehendelsesdato', () => {
        const kontekst = lagKontekst({
            søker: 'MOR',
            valgtePerioder: [{ fom: '2024-08-31', tom: '2024-09-04' }],
        });

        it('skal vise «Legg til utsettelse»', () => {
            expect(VIS_LEGG_TIL_UTSETTELSE_VALG.skalVises(kontekst)).toBe(true);
        });

        it('skal ikke vise «Legg til ferie» — kun utsettelse (sykdom/innlagt) er gyldig her', () => {
            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal ikke vise «Legg til periode uten foreldrepenger»', () => {
            expect(VIS_LEGG_TIL_OPPHOLD_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal ikke vise «Legg til pause»', () => {
            expect(VIS_LEGG_TIL_PAUSE_VALG.skalVises(kontekst)).toBe(false);
        });
    });

    describe('mor med periode etter de første seks ukene etter familiehendelsesdato', () => {
        const kontekst = lagKontekst({
            søker: 'MOR',
            valgtePerioder: [{ fom: '2024-09-16', tom: '2024-09-20' }],
        });

        it('skal ikke vise «Legg til utsettelse»', () => {
            expect(VIS_LEGG_TIL_UTSETTELSE_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal vise «Legg til ferie»', () => {
            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(true);
        });

        it('skal vise «Legg til periode uten foreldrepenger»', () => {
            expect(VIS_LEGG_TIL_OPPHOLD_VALG.skalVises(kontekst)).toBe(true);
        });
    });

    describe('mor ved adopsjon, periode innenfor det som ville vært seks-ukersvinduet', () => {
        const kontekst = lagKontekst({
            søker: 'MOR',
            familiesituasjon: 'adopsjon',
            valgtePerioder: [{ fom: '2024-08-31', tom: '2024-09-04' }],
        });

        it('skal ikke vise «Legg til utsettelse», siden regelen ikke gjelder adopsjon', () => {
            expect(VIS_LEGG_TIL_UTSETTELSE_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal vise «Legg til ferie», siden mor-restriksjonen ikke gjelder adopsjon', () => {
            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(true);
        });
    });

    describe('far/medmor med BARE_SØKER_RETT', () => {
        it('skal vise «Legg til ferie» for periode i de første seks ukene, siden pause ikke er gyldig der', () => {
            const kontekst = lagKontekst({
                søker: 'FAR_MEDMOR',
                rettighetType: 'BARE_SØKER_RETT',
                valgtePerioder: [{ fom: '2024-08-31', tom: '2024-09-04' }],
            });

            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(true);
            expect(VIS_LEGG_TIL_PAUSE_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal ikke vise «Legg til ferie» for periode etter seks uker, siden pause er gyldig der i stedet', () => {
            const kontekst = lagKontekst({
                søker: 'FAR_MEDMOR',
                rettighetType: 'BARE_SØKER_RETT',
                valgtePerioder: [{ fom: '2024-09-16', tom: '2024-09-20' }],
            });

            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(false);
            expect(VIS_LEGG_TIL_PAUSE_VALG.skalVises(kontekst)).toBe(true);
        });
    });

    describe('periode før familiehendelsesdato', () => {
        it('skal ikke vise «Legg til ferie» når perioden starter før familiehendelsesdato', () => {
            const kontekst = lagKontekst({
                søker: 'MOR',
                valgtePerioder: [{ fom: '2024-07-15', tom: '2024-07-29' }],
            });

            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal ikke vise «Legg til periode uten foreldrepenger» når perioden starter før familiehendelsesdato', () => {
            const kontekst = lagKontekst({
                søker: 'MOR',
                valgtePerioder: [{ fom: '2024-07-15', tom: '2024-07-29' }],
            });

            expect(VIS_LEGG_TIL_OPPHOLD_VALG.skalVises(kontekst)).toBe(false);
        });

        it('skal gjelde for far/medmor med BARE_SØKER_RETT også', () => {
            const kontekst = lagKontekst({
                søker: 'FAR_MEDMOR',
                rettighetType: 'BARE_SØKER_RETT',
                valgtePerioder: [{ fom: '2024-07-15', tom: '2024-07-29' }],
            });

            expect(VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst)).toBe(false);
        });
    });
});
