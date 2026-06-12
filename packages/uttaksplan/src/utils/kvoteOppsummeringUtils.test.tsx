import { describe, expect, it } from 'vitest';

import { KontoBeregningDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { summerDagerIPerioder } from './kvoteOppsummeringUtils';

const FAMILIEHENDELSESDATO = '2024-04-01'; // Mandag

const KONTOER: KontoBeregningDto = {
    kontoer: [
        { konto: 'MØDREKVOTE', dager: 75 },
        { konto: 'FEDREKVOTE', dager: 75 },
        { konto: 'FELLESPERIODE', dager: 80 },
        { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
    ],
    minsteretter: { farRundtFødsel: 0, toTette: 0 },
    tillegg: { flerbarn: 0, prematur: 0 },
};

const lagMorsMødrekvotePeriode = (fom: string, tom: string, arbeidstidprosent?: number): UttakPeriode_fpoversikt => ({
    fom,
    tom,
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    gradering: arbeidstidprosent ? { arbeidstidprosent, aktivitet: { type: 'ORDINÆRT_ARBEID' } } : undefined,
});

describe('summerDagerIPerioder – mors gradering i 3v før / 6v etter familiehendelse', () => {
    it('skal trekke 30 fulle dager (6 uker) når mor jobbar 50 % heile seksvekersperioden etter fødsel', () => {
        const seksUkerEtterFødsel = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10', 50);

        const dager = summerDagerIPerioder([seksUkerEtterFødsel], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(30);
    });

    it('skal trekke 15 fulle dager (3 uker) når mor jobbar 50 % heile treukersperioden før fødsel på FORELDREPENGER_FØR_FØDSEL', () => {
        const treUkerFørFødsel: UttakPeriode_fpoversikt = {
            fom: '2024-03-11',
            tom: '2024-03-29',
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            flerbarnsdager: false,
            gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
        };

        const dager = summerDagerIPerioder([treUkerFørFødsel], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });

    it('skal trekke gradert (halvparten av dagane) når mor jobbar 50 % utanfor vinduet', () => {
        // 4 uker (20 uttaksdager) startar etter 6 vekers-vinduet sluttar
        const utanforVindu = lagMorsMødrekvotePeriode('2024-05-13', '2024-06-07', 50);

        const dager = summerDagerIPerioder([utanforVindu], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(10);
    });

    it('skal splitte korrekt når perioden delvis overlappar vinduet', () => {
        // Periode startar 5 uker etter fødsel, varer i 4 uker (20 uttaksdager).
        // 5 uttaksdager fell innanfor 6v-vindauget, 15 utanfor.
        // Forventa: 5 fulle + 15 * 0.5 = 5 + 7.5 = 12.5 → floor = 12
        const delvisOverlapp = lagMorsMødrekvotePeriode('2024-05-06', '2024-05-31', 50);

        const dager = summerDagerIPerioder([delvisOverlapp], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(12);
    });

    it('skal IKKJE bruka spesialregel for adopsjon', () => {
        const seksUker = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10', 50);

        const dager = summerDagerIPerioder([seksUker], KONTOER.kontoer, 'adopsjon', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });

    it('skal IKKJE bruka spesialregel for far/medmor sin gradering', () => {
        const farsPeriode: UttakPeriode_fpoversikt = {
            fom: '2024-04-01',
            tom: '2024-05-10',
            forelder: 'FAR_MEDMOR',
            kontoType: 'MØDREKVOTE',
            flerbarnsdager: false,
            gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
        };

        const dager = summerDagerIPerioder([farsPeriode], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });
});

describe('summerDagerIPerioder – summering av graderte dagar (ingen flyttalsfeil)', () => {
    const lagFellesperiodeEndag = (dato: string): UttakPeriode_fpoversikt => ({
        fom: dato,
        tom: dato,
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        flerbarnsdager: false,
        gradering: { arbeidstidprosent: 40, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
    });

    it('skal telje 6 dagar (ikkje 5) for ti graderte endagsperiodar à 0,6 dag', () => {
        // Kvar dag med 40 % arbeid trekkjer 0,6 dag. 10 × 0,6 = 6,0 dagar.
        // I flyttal blir summen 5,999999999999999, og ein naiv Math.floor på
        // summen ville (feilaktig) gitt 5 og late ein fellesperiodedag stå att.
        const enUkedagPerHverdag = [
            '2024-04-01',
            '2024-04-02',
            '2024-04-03',
            '2024-04-04',
            '2024-04-05',
            '2024-04-08',
            '2024-04-09',
            '2024-04-10',
            '2024-04-11',
            '2024-04-12',
        ];
        const perioder = enUkedagPerHverdag.map(lagFellesperiodeEndag);

        const dager = summerDagerIPerioder(perioder, KONTOER.kontoer, 'adopsjon', FAMILIEHENDELSESDATO);

        expect(dager).toBe(6);
    });
});
