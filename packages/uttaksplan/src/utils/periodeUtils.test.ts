import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { harPeriodeDerMorsAktivitetIkkeErValgt } from './periodeUtils';

const lagFarPeriode = (overrides: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2025-06-02',
    tom: '2025-07-25',
    forelder: 'FAR_MEDMOR',
    kontoType: 'FELLESPERIODE',
    flerbarnsdager: false,
    morsAktivitet: undefined,
    ...overrides,
});

const lagMorPeriode = (overrides: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2025-06-02',
    tom: '2025-07-25',
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    ...overrides,
});

describe('harPeriodeDerMorsAktivitetIkkeErValgt', () => {
    it('skal returnere true når far har periode uten morsAktivitet og ingen overlappende mor-periode', () => {
        const perioder = [lagFarPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false ved ALENEOMSORG uavhengig av perioder', () => {
        const perioder = [lagFarPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('ALENEOMSORG', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når far har periode uten morsAktivitet og overlappende mor-periode med samtidigUttak + gradering = 100', () => {
        const perioder = [
            lagFarPeriode({ samtidigUttak: 50 }),
            lagMorPeriode({
                samtidigUttak: 50,
                gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ANNET' } },
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når mor tar 100% samtidigUttak uten gradering', () => {
        const perioder = [
            lagFarPeriode({ samtidigUttak: 100 }),
            lagMorPeriode({ samtidigUttak: 100 }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når overlappende mor-periode ikke summerer til 100% (samtidigUttak + gradering < 100)', () => {
        const perioder = [
            lagFarPeriode({ samtidigUttak: 40 }),
            lagMorPeriode({
                samtidigUttak: 40,
                gradering: { arbeidstidprosent: 40, aktivitet: { type: 'ANNET' } },
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(true);
    });

    it('skal returnere true når mor-perioden ikke overlapper med far-perioden', () => {
        const perioder = [
            lagFarPeriode({ fom: '2025-06-02', tom: '2025-07-25' }),
            lagMorPeriode({
                fom: '2025-08-01',
                tom: '2025-09-01',
                samtidigUttak: 50,
                gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ANNET' } },
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når far-periode med morsAktivitet satt ikke trigges', () => {
        const perioder = [lagFarPeriode({ morsAktivitet: 'ARBEID' })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', perioder);

        expect(result).toBe(false);
    });
});
