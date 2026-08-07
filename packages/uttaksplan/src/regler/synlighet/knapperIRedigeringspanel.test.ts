import { describe, expect, it } from 'vitest';

import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { Periode } from '../types';
import { SKAL_VISE_FERIEKNAPP, SKAL_VISE_PAUSEKNAPP, SKAL_VISE_UTSETTELSESKNAPP } from './knapperIRedigeringspanel';

// Torsdag. Seks uker etter blir 2024-09-10.
const FAMILIEHENDELSESDATO = '2024-07-30';

type Kontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: never[];
    erPeriodeneTilAnnenPartLåst: boolean;
};

const lagKontekst = (overrides: Partial<Kontekst> = {}): Kontekst => ({
    søker: 'MOR',
    rettighetType: 'BEGGE_RETT',
    familiesituasjon: 'termin',
    familiehendelsedato: FAMILIEHENDELSESDATO,
    sammenslåtteValgtePerioder: [],
    eksisterendePerioderSomErValgt: [],
    erPeriodeneTilAnnenPartLåst: false,
    ...overrides,
});

describe('knapperIRedigeringspanel — periode før familiehendelsesdato', () => {
    it('skal ikke vise «Legg til ferie»-knappen når perioden starter før familiehendelsesdato', () => {
        const kontekst = lagKontekst({
            sammenslåtteValgtePerioder: [{ fom: '2024-07-15', tom: '2024-07-29' }],
        });

        expect(SKAL_VISE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });

    it('skal gjelde for far/medmor med BARE_SØKER_RETT også', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
            sammenslåtteValgtePerioder: [{ fom: '2024-07-15', tom: '2024-07-29' }],
        });

        expect(SKAL_VISE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });

    it('skal vise «Legg til ferie»-knappen når perioden starter på eller etter familiehendelsesdato', () => {
        const kontekst = lagKontekst({
            sammenslåtteValgtePerioder: [{ fom: '2024-09-16', tom: '2024-09-20' }],
        });

        expect(SKAL_VISE_FERIEKNAPP.skalVises(kontekst)).toBe(true);
    });
});

describe('knapperIRedigeringspanel — eksisterende regler (regresjonssjekk)', () => {
    it('skal vise «Legg til utsettelse»-knappen for mor innenfor de første seks ukene', () => {
        const kontekst = lagKontekst({
            sammenslåtteValgtePerioder: [{ fom: '2024-08-31', tom: '2024-09-04' }],
        });

        expect(SKAL_VISE_UTSETTELSESKNAPP.skalVises(kontekst)).toBe(true);
        expect(SKAL_VISE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });

    it('skal vise «Legg til pause»-knappen for far/medmor med BARE_SØKER_RETT etter seks uker', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
            sammenslåtteValgtePerioder: [{ fom: '2024-09-16', tom: '2024-09-20' }],
        });

        expect(SKAL_VISE_PAUSEKNAPP.skalVises(kontekst)).toBe(true);
        expect(SKAL_VISE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });
});
