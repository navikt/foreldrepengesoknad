import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { harKunPerioderForAnnenForelder, erKunUtsettelser } from './submitValidering';

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
