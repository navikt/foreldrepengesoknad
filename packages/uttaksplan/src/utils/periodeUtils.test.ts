import { PeriodeDto_fpoversikt, UttakDto_fpoversikt } from '@navikt/fp-types';

import {
    finnAntallTidelerÅTrekkeForPart,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
} from './periodeUtils';

const FOM = '2025-06-02';
const TOM = '2025-07-25';

const lagFarPart = (overrides: Partial<UttakDto_fpoversikt> = {}): UttakDto_fpoversikt => ({
    forelder: 'FAR_MEDMOR',
    kontoType: 'FELLESPERIODE',
    flerbarnsdager: false,
    morsAktivitet: undefined,
    ...overrides,
});

const lagMorPart = (overrides: Partial<UttakDto_fpoversikt> = {}): UttakDto_fpoversikt => ({
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    ...overrides,
});

const lagPeriode = (
    parter: Pick<PeriodeDto_fpoversikt, 'søker' | 'annenPart'>,
    fom = FOM,
    tom = TOM,
): PeriodeDto_fpoversikt => ({ fom, tom, ...parter });

const lagFarSøkerPeriode = (overrides: Partial<UttakDto_fpoversikt> = {}) =>
    lagPeriode({ søker: lagFarPart(overrides) });

describe('harPeriodeDerMorsAktivitetIkkeErValgt', () => {
    it('skal returnere true når far har periode uten morsAktivitet og ingen overlappende mor-periode', () => {
        const perioder = [lagFarSøkerPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når søker er MOR uavhengig av far-perioder uten morsAktivitet', () => {
        const perioder = [lagPeriode({ annenPart: lagFarPart() })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'MOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når søker er MOR men søker ikke er spesifisert (planlegger felles plan)', () => {
        const perioder = [lagPeriode({ annenPart: lagFarPart() })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'MOR', true, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false ved ALENEOMSORG uavhengig av perioder', () => {
        const perioder = [lagFarSøkerPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('ALENEOMSORG', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false ved erFarOgFar uavhengig av perioder', () => {
        const perioder = [lagFarSøkerPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder, true);

        expect(result).toBe(false);
    });

    it('skal returnere false når far har periode uten morsAktivitet og overlappende mor-periode med samtidigUttak + gradering = 100', () => {
        const perioder = [
            lagPeriode({
                søker: lagFarPart({ samtidigUttak: 50 }),
                annenPart: lagMorPart({
                    samtidigUttak: 50,
                    gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ANNET' } },
                }),
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når mor tar 100 % samtidigUttak uten gradering', () => {
        const perioder = [
            lagPeriode({ søker: lagFarPart({ samtidigUttak: 100 }), annenPart: lagMorPart({ samtidigUttak: 100 }) }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når overlappende mor-periode ikke summerer til 100 % (samtidigUttak + gradering < 100)', () => {
        const perioder = [
            lagPeriode({
                søker: lagFarPart({ samtidigUttak: 40 }),
                annenPart: lagMorPart({
                    samtidigUttak: 40,
                    gradering: { arbeidstidprosent: 40, aktivitet: { type: 'ANNET' } },
                }),
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere true når mor-perioden ikke overlapper med far-perioden', () => {
        const perioder = [
            lagPeriode({ søker: lagFarPart() }, '2025-06-02', '2025-07-25'),
            lagPeriode(
                {
                    annenPart: lagMorPart({
                        samtidigUttak: 50,
                        gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ANNET' } },
                    }),
                },
                '2025-08-01',
                '2025-09-01',
            ),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når far-periode med morsAktivitet satt ikke trigges', () => {
        const perioder = [lagFarSøkerPeriode({ morsAktivitet: 'ARBEID' })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });
});

describe('harPeriodeMedUkjentGraderingsaktivitet', () => {
    it('skal returnere true når søkers periode har gradering med ANNET (frå planleggaren)', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: { type: 'ANNET' },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når ANNET-perioden tilhøyrer annen part (ikkje søker)', () => {
        const perioder = [
            lagPeriode({
                annenPart: lagFarPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: { type: 'ANNET' },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når søkers periode har gradering med ORDINÆRT_ARBEID uten arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: { type: 'ORDINÆRT_ARBEID' },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når ORDINÆRT_ARBEID har gyldig arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: { id: '910909088', type: 'ORGANISASJON' },
                        },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når arbeidsgiver-id er aktivitetstype-plassholdaren ORDINÆRT_ARBEID', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: { id: 'ORDINÆRT_ARBEID', type: 'ORGANISASJON' },
                        },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false for FRILANS uten arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: { arbeidstidprosent: 60, aktivitet: { type: 'FRILANS' } },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for SELVSTENDIG_NÆRINGSDRIVENDE uten arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorPart({
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: { type: 'SELVSTENDIG_NÆRINGSDRIVENDE' },
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false når perioden ikke har gradering', () => {
        const perioder = [lagPeriode({ søker: lagMorPart() })];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for tom liste', () => {
        expect(harPeriodeMedUkjentGraderingsaktivitet([], 'MOR')).toBe(false);
    });
});

describe('finnAntallTidelerÅTrekkeForPart', () => {
    it('skal runde desimalprosent eksakt ned til 1 desimal utan flyttals-underflyt', () => {
        const periodeMed25Uttaksdager = { fom: '2025-06-02', tom: '2025-07-04' };

        const tideler = finnAntallTidelerÅTrekkeForPart(
            periodeMed25Uttaksdager,
            lagFarPart({ samtidigUttak: 9.2 }),
            false,
            '2025-01-01',
        );

        expect(tideler).toBe(23);
    });
});
