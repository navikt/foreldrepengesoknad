import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import {
    finnAntallTidelerÅTrekke,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
} from './periodeUtils';

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

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når søker er MOR uavhengig av far-perioder uten morsAktivitet', () => {
        const perioder = [lagFarPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'MOR', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false ved ALENEOMSORG uavhengig av perioder', () => {
        const perioder = [lagFarPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('ALENEOMSORG', 'FAR_MEDMOR', perioder);

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

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når mor tar 100% samtidigUttak uten gradering', () => {
        const perioder = [lagFarPeriode({ samtidigUttak: 100 }), lagMorPeriode({ samtidigUttak: 100 })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når mor tar samtidig uttak selv om det ikke summerer til 100% (samlet uttak 80%)', () => {
        const perioder = [lagFarPeriode({ samtidigUttak: 40 }), lagMorPeriode({ samtidigUttak: 40 })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når overlappende mor-periode kun har gradering uten samtidig uttak', () => {
        const perioder = [
            lagFarPeriode(),
            lagMorPeriode({ gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ANNET' } } }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

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

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når far-periode med morsAktivitet satt ikke trigges', () => {
        const perioder = [lagFarPeriode({ morsAktivitet: 'ARBEID' })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', perioder);

        expect(result).toBe(false);
    });
});

describe('harPeriodeMedUkjentGraderingsaktivitet', () => {
    it('skal returnere true når søkers periode har gradering med ANNET (frå planleggaren)', () => {
        const perioder = [
            lagMorPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: { type: 'ANNET' },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når ANNET-perioden tilhøyrer annen part (ikkje søker)', () => {
        const perioder = [
            lagFarPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: { type: 'ANNET' },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når søkers periode har gradering med ORDINÆRT_ARBEID uten arbeidsgiver', () => {
        const perioder = [
            lagMorPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: { type: 'ORDINÆRT_ARBEID' },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når ORDINÆRT_ARBEID har gyldig arbeidsgiver', () => {
        const perioder = [
            lagMorPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                        arbeidsgiver: { id: '910909088', type: 'ORGANISASJON' },
                    },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når arbeidsgiver-id er aktivitetstype-plassholdaren ORDINÆRT_ARBEID', () => {
        const perioder = [
            lagMorPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                        arbeidsgiver: { id: 'ORDINÆRT_ARBEID', type: 'ORGANISASJON' },
                    },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false for FRILANS uten arbeidsgiver', () => {
        const perioder = [
            lagMorPeriode({
                gradering: { arbeidstidprosent: 60, aktivitet: { type: 'FRILANS' } },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for SELVSTENDIG_NÆRINGSDRIVENDE uten arbeidsgiver', () => {
        const perioder = [
            lagMorPeriode({
                gradering: {
                    arbeidstidprosent: 60,
                    aktivitet: { type: 'SELVSTENDIG_NÆRINGSDRIVENDE' },
                },
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false når perioden ikke har gradering', () => {
        const perioder = [lagMorPeriode()];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for tom liste', () => {
        expect(harPeriodeMedUkjentGraderingsaktivitet([], 'MOR')).toBe(false);
    });
});

describe('finnAntallTidelerÅTrekke', () => {
    it('skal runde desimalprosent eksakt ned til 1 desimal utan flyttals-underflyt', () => {
        const periodeMed25Uttaksdager = lagFarPeriode({
            fom: '2025-06-02',
            tom: '2025-07-04',
            samtidigUttak: 9.2,
        });

        const tideler = finnAntallTidelerÅTrekke(periodeMed25Uttaksdager, false, '2025-01-01');

        expect(tideler).toBe(23);
    });
});
