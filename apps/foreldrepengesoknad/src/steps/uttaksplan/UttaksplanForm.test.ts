import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { kanJustereFarsUttakRundtFødsel } from './UttaksplanForm';
import { erKunUtsettelser, harKunPerioderForAnnenForelder } from './submitValidering';

const utsettelseFar: UttakPeriode_fpoversikt = {
    fom: '2026-06-01',
    tom: '2026-06-05',
    forelder: 'FAR_MEDMOR',
    flerbarnsdager: false,
    kontoType: 'FEDREKVOTE',
    utsettelseÅrsak: 'LOVBESTEMT_FERIE',
};

const utsettelseArbeidFar: UttakPeriode_fpoversikt = {
    fom: '2026-06-08',
    tom: '2026-06-12',
    forelder: 'FAR_MEDMOR',
    flerbarnsdager: false,
    kontoType: 'FEDREKVOTE',
    utsettelseÅrsak: 'ARBEID',
};

const uttakFar: UttakPeriode_fpoversikt = {
    fom: '2026-07-01',
    tom: '2026-07-31',
    forelder: 'FAR_MEDMOR',
    flerbarnsdager: false,
    kontoType: 'FEDREKVOTE',
};

const uttakMor: UttakPeriode_fpoversikt = {
    fom: '2026-05-01',
    tom: '2026-05-31',
    forelder: 'MOR',
    flerbarnsdager: false,
    kontoType: 'MØDREKVOTE',
};

describe('harKunPerioderForAnnenForelder', () => {
    it('returnerer false når perioder er undefined eller tom', () => {
        expect(harKunPerioderForAnnenForelder(true, false)).toBe(false);
        expect(harKunPerioderForAnnenForelder(true, false, [])).toBe(false);
    });

    it('returnerer false når søker (far) har minst én ekte uttaksperiode', () => {
        expect(harKunPerioderForAnnenForelder(true, false, [uttakMor, uttakFar])).toBe(false);
    });

    it('returnerer true når planen kun har perioder for annen forelder', () => {
        expect(harKunPerioderForAnnenForelder(true, false, [uttakMor])).toBe(true);
    });

    it('returnerer false for aleneomsorg', () => {
        expect(harKunPerioderForAnnenForelder(true, true, [uttakMor, utsettelseFar])).toBe(false);
    });
});

describe('erKunUtsettelser', () => {
    it('returnerer false for tom plan', () => {
        expect(erKunUtsettelser([])).toBe(false);
    });

    it('returnerer true når planen kun har utsettelser uten ferie', () => {
        expect(erKunUtsettelser([utsettelseArbeidFar])).toBe(true);
    });

    it('returnerer false når planen kun har ferie', () => {
        expect(erKunUtsettelser([utsettelseFar])).toBe(false);
    });

    it('returnerer false når planen har ferie sammen med andre utsettelser', () => {
        expect(erKunUtsettelser([utsettelseFar, utsettelseArbeidFar])).toBe(false);
    });

    it('returnerer false når planen har en ekte uttaksperiode', () => {
        expect(erKunUtsettelser([utsettelseArbeidFar, uttakFar])).toBe(false);
    });
});

describe('kanJustereFarsUttakRundtFødsel', () => {
    // Termin 2026-07-06 (mandag). Intervall far rundt fødsel: [2026-06-22, 2026-08-16].
    const termindato = '2026-07-06';

    const lagFarPeriode = (overrides: Partial<UttakPeriode_fpoversikt>): UttakPeriode_fpoversikt => ({
        fom: '2026-07-06',
        tom: '2026-07-10',
        forelder: 'FAR_MEDMOR',
        flerbarnsdager: false,
        kontoType: 'FORELDREPENGER',
        ...overrides,
    });

    it('returnerer false når far ikke har perioder', () => {
        expect(kanJustereFarsUttakRundtFødsel([], termindato)).toBe(false);
    });

    it('returnerer true for én foreldrepengeperiode som starter på termin og ligger innenfor 6 uker', () => {
        const periode = lagFarPeriode({ fom: '2026-07-06', tom: '2026-08-14' });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(true);
    });

    it('returnerer false når perioden starter på termin men strekker seg forbi 6 uker (hovedfeilen)', () => {
        const periode = lagFarPeriode({ fom: '2026-07-06', tom: '2026-09-30' });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(false);
    });

    it('returnerer false når perioden ikke starter på termin', () => {
        const periode = lagFarPeriode({ fom: '2026-07-13', tom: '2026-07-17' });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(false);
    });

    it('returnerer true for fedrekvote med samtidig uttak som starter på termin', () => {
        const periode = lagFarPeriode({
            fom: '2026-07-06',
            tom: '2026-07-17',
            kontoType: 'FEDREKVOTE',
            samtidigUttak: 100,
        });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(true);
    });

    it('returnerer false for fedrekvote uten samtidig uttak', () => {
        const periode = lagFarPeriode({ fom: '2026-07-06', tom: '2026-07-17', kontoType: 'FEDREKVOTE' });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(false);
    });

    it('returnerer false når første periode er en utsettelse selv om kontoType er satt', () => {
        const periode = lagFarPeriode({
            fom: '2026-07-06',
            tom: '2026-07-17',
            kontoType: 'FORELDREPENGER',
            utsettelseÅrsak: 'ARBEID',
        });
        expect(kanJustereFarsUttakRundtFødsel([periode], termindato)).toBe(false);
    });

    it('returnerer false når det er flere enn én periode innenfor intervallet rundt fødsel', () => {
        const førstePeriode = lagFarPeriode({ fom: '2026-07-06', tom: '2026-07-10' });
        const andrePeriode = lagFarPeriode({ fom: '2026-08-03', tom: '2026-08-07', kontoType: 'FEDREKVOTE' });
        expect(kanJustereFarsUttakRundtFødsel([førstePeriode, andrePeriode], termindato)).toBe(false);
    });

    it('returnerer false når far har en tidligere periode før intervallet slik at første periode ikke er på termin', () => {
        const tidligerePeriode = lagFarPeriode({ fom: '2026-06-01', tom: '2026-06-05' });
        const periodePåTermin = lagFarPeriode({ fom: '2026-07-06', tom: '2026-07-10' });
        expect(kanJustereFarsUttakRundtFødsel([tidligerePeriode, periodePåTermin], termindato)).toBe(false);
    });
});
