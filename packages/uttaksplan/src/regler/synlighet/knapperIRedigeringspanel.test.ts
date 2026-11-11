import { describe, expect, it } from 'vitest';

import type {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    RettighetType_fpoversikt,
    UttakPeriodeDto,
} from '@navikt/fp-types';

import { Periode } from '../types';
import {
    SKAL_DEAKTIVERE_FERIEKNAPP,
    SKAL_VISE_FERIEKNAPP,
    SKAL_VISE_LEGG_TIL_KNAPPETEKST,
    SKAL_VISE_PAUSEKNAPP,
    SKAL_VISE_UTSETTELSESKNAPP,
} from './knapperIRedigeringspanel';

// Torsdag. Seks uker etter blir 2024-09-10.
const FAMILIEHENDELSESDATO = '2024-07-30';

type Kontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: UttakPeriodeDto[];
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

describe('knapperIRedigeringspanel — låste perioder til annen part', () => {
    const morsPeriode: UttakPeriodeDto = {
        fom: '2024-09-16',
        tom: '2024-09-20',
        annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
    };
    const farsPeriode: UttakPeriodeDto = {
        fom: '2024-09-16',
        tom: '2024-09-20',
        søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
    };

    it('skal deaktivere ferie-knappen når en valgt periode tilhører annen part og er låst', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            eksisterendePerioderSomErValgt: [morsPeriode],
        });

        expect(SKAL_DEAKTIVERE_FERIEKNAPP.skalVises(kontekst)).toBe(true);
    });

    it('skal ikke deaktivere ferie-knappen når annen part sine perioder ikke er låst', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: false,
            eksisterendePerioderSomErValgt: [morsPeriode],
        });

        expect(SKAL_DEAKTIVERE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });

    it('skal ikke deaktivere ferie-knappen når de valgte periodene kun er søker sine egne', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            eksisterendePerioderSomErValgt: [farsPeriode],
        });

        expect(SKAL_DEAKTIVERE_FERIEKNAPP.skalVises(kontekst)).toBe(false);
    });

    it('skal vise «Ny periode» når en valgt låst periode tilhører annen part uten samtidig uttak', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            eksisterendePerioderSomErValgt: [morsPeriode],
        });

        expect(SKAL_VISE_LEGG_TIL_KNAPPETEKST.skalVises(kontekst)).toBe(true);
    });

    it('skal vise «Endre» når annen part har samtidig uttak i den valgte låste perioden', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            sammenslåtteValgtePerioder: [{ fom: '2024-09-16', tom: '2024-09-17' }],
            eksisterendePerioderSomErValgt: [
                { ...morsPeriode, annenPart: { ...morsPeriode.annenPart!, samtidigUttak: 50 } },
            ],
        });

        expect(SKAL_VISE_LEGG_TIL_KNAPPETEKST.skalVises(kontekst)).toBe(false);
    });

    it('skal vise «Ny periode» når valgte dager ligger i flere låste perioder til annen part', () => {
        const samtidigPeriode = { ...morsPeriode, annenPart: { ...morsPeriode.annenPart!, samtidigUttak: 50 } };
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            sammenslåtteValgtePerioder: [
                { fom: '2024-09-16', tom: '2024-09-16' },
                { fom: '2024-09-24', tom: '2024-09-24' },
            ],
            eksisterendePerioderSomErValgt: [
                samtidigPeriode,
                { ...samtidigPeriode, fom: '2024-09-23', tom: '2024-09-27' },
            ],
        });

        expect(SKAL_VISE_LEGG_TIL_KNAPPETEKST.skalVises(kontekst)).toBe(true);
    });

    it('skal vise «Ny periode» når valgte dager går utenfor den låste perioden med samtidig uttak', () => {
        const kontekst = lagKontekst({
            søker: 'FAR_MEDMOR',
            erPeriodeneTilAnnenPartLåst: true,
            sammenslåtteValgtePerioder: [{ fom: '2024-09-19', tom: '2024-09-24' }],
            eksisterendePerioderSomErValgt: [
                { ...morsPeriode, annenPart: { ...morsPeriode.annenPart!, samtidigUttak: 50 } },
            ],
        });

        expect(SKAL_VISE_LEGG_TIL_KNAPPETEKST.skalVises(kontekst)).toBe(true);
    });
});
