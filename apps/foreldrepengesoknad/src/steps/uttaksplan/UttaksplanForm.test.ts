import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { harKunPerioderForAnnenForelder } from './submitValidering';

const utsettelseFar: UttakPeriode_fpoversikt = {
    fom: '2026-06-01',
    tom: '2026-06-05',
    forelder: 'FAR_MEDMOR',
    flerbarnsdager: false,
    kontoType: 'FEDREKVOTE',
    utsettelseÅrsak: 'LOVBESTEMT_FERIE',
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

    it('returnerer true når søker (far) kun har utsettelser og mor har uttaksperioder', () => {
        // Sak 152610557: far søker, mor har eksisterende vedtak/uttak,
        // far har kun utsettelse (ferie/barn syk). Skal blokkeres med feilmelding.
        expect(harKunPerioderForAnnenForelder(true, false, [uttakMor, utsettelseFar])).toBe(true);
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
