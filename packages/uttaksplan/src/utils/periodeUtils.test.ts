import { UttakDto, UttakPeriodeDto } from '@navikt/fp-types';

import {
    erAvslåttPeriode,
    finnAntallTidelerÅTrekkeForUttak,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
    sorterUttakPerioder,
} from './periodeUtils';

const FOM = '2025-06-02';
const TOM = '2025-07-25';

const lagFarUttak = (overrides: Partial<UttakDto> = {}): UttakDto => ({
    forelder: 'FAR_MEDMOR',
    kontoType: 'FELLESPERIODE',
    flerbarnsdager: false,
    morsAktivitet: undefined,
    ...overrides,
});

const lagMorUttak = (overrides: Partial<UttakDto> = {}): UttakDto => ({
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    ...overrides,
});

const lagPeriode = (
    alleUttak: Pick<UttakPeriodeDto, 'søker' | 'annenPart'>,
    fom = FOM,
    tom = TOM,
): UttakPeriodeDto => ({
    fom,
    tom,
    ...alleUttak,
});

const lagFarSøkerPeriode = (overrides: Partial<UttakDto> = {}) => lagPeriode({ søker: lagFarUttak(overrides) });

describe('sorterUttakPerioder', () => {
    const perioder = [
        lagPeriode({ søker: lagFarUttak() }, '2025-06-02', '2025-06-06'),
        lagPeriode({ søker: lagFarUttak() }, '2025-06-04', '2025-06-10'),
        lagPeriode({ annenPart: lagMorUttak() }, '2025-06-02', '2025-06-10'),
        lagPeriode({ annenPart: lagMorUttak() }, '2025-06-02', '2025-06-13'),
        lagPeriode({ søker: lagFarUttak() }, '2025-06-16', '2025-06-20'),
    ];

    it('skal sortere omsluttede perioder først, også ved lik start eller slutt', () => {
        expect([...perioder].reverse().sort(sorterUttakPerioder)).toEqual(perioder);
    });

    it('skal bevare rekkefølgen til perioder med identiske datoer', () => {
        const mor = lagPeriode({ annenPart: lagMorUttak() });
        const far = lagFarSøkerPeriode();

        expect(sorterUttakPerioder(mor, far)).toBe(0);
        expect(sorterUttakPerioder(mor, mor)).toBe(0);
        expect([mor, far].sort(sorterUttakPerioder)).toEqual([mor, far]);
        expect([far, mor].sort(sorterUttakPerioder)).toEqual([far, mor]);
    });

    it('skal gi motsatt fortegn når argumentene byttes og ha transitiv rekkefølge', () => {
        for (const a of perioder) {
            for (const b of perioder) {
                expect(Math.sign(sorterUttakPerioder(a, b)) + Math.sign(sorterUttakPerioder(b, a))).toBe(0);
                const etterfølgendePerioder = perioder.filter(
                    (c) => sorterUttakPerioder(a, b) <= 0 && sorterUttakPerioder(b, c) <= 0,
                );
                for (const c of etterfølgendePerioder) {
                    expect(sorterUttakPerioder(a, c)).toBeLessThanOrEqual(0);
                }
            }
        }
    });

    it('skal sortere ugyldige perioder først og behandle to ugyldige perioder likt', () => {
        const ugyldig = lagPeriode({ søker: lagFarUttak() }, '2025-06-10', '2025-06-02');
        const annenUgyldig = lagPeriode({ annenPart: lagMorUttak() }, 'ugyldig');
        const gyldig = lagPeriode({ annenPart: lagMorUttak() });

        expect(sorterUttakPerioder(ugyldig, annenUgyldig)).toBe(0);
        expect(sorterUttakPerioder(ugyldig, gyldig)).toBeLessThan(0);
        expect(sorterUttakPerioder(gyldig, ugyldig)).toBeGreaterThan(0);
    });
});

describe('harPeriodeDerMorsAktivitetIkkeErValgt', () => {
    it('skal returnere true når far har periode uten morsAktivitet og ingen overlappende mor-periode', () => {
        const perioder = [lagFarSøkerPeriode()];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere false når søker er MOR uavhengig av far-perioder uten morsAktivitet', () => {
        const perioder = [lagPeriode({ annenPart: lagFarUttak() })];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'MOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når søker er MOR men søker ikke er spesifisert (planlegger felles plan)', () => {
        const perioder = [lagPeriode({ annenPart: lagFarUttak() })];

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
                søker: lagFarUttak({ samtidigUttak: 50 }),
                annenPart: lagMorUttak({
                    samtidigUttak: 50,
                    gradering: { arbeidstidprosent: 50 },
                }),
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere false når mor tar 100 % samtidigUttak uten gradering', () => {
        const perioder = [
            lagPeriode({ søker: lagFarUttak({ samtidigUttak: 100 }), annenPart: lagMorUttak({ samtidigUttak: 100 }) }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(false);
    });

    it('skal returnere true når overlappende mor-periode ikke summerer til 100 % (samtidigUttak + gradering < 100)', () => {
        const perioder = [
            lagPeriode({
                søker: lagFarUttak({ samtidigUttak: 40 }),
                annenPart: lagMorUttak({
                    samtidigUttak: 40,
                    gradering: { arbeidstidprosent: 40 },
                }),
            }),
        ];

        const result = harPeriodeDerMorsAktivitetIkkeErValgt('BEGGE_RETT', 'FAR_MEDMOR', false, perioder);

        expect(result).toBe(true);
    });

    it('skal returnere true når mor-perioden ikke overlapper med far-perioden', () => {
        const perioder = [
            lagPeriode({ søker: lagFarUttak() }, '2025-06-02', '2025-07-25'),
            lagPeriode(
                {
                    annenPart: lagMorUttak({
                        samtidigUttak: 50,
                        gradering: { arbeidstidprosent: 50 },
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
    it('skal returnere true når søkers periode har gradering utan aktivitet (frå planleggaren)', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorUttak({
                    gradering: {
                        arbeidstidprosent: 60,
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når perioden utan aktivitet tilhøyrer annen part (ikkje søker)', () => {
        const perioder = [
            lagPeriode({
                annenPart: lagFarUttak({
                    gradering: {
                        arbeidstidprosent: 60,
                    },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når søkers periode har gradering med aktivitet null (frå backend)', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorUttak({
                    gradering: { arbeidstidprosent: 60, aktivitet: null as unknown as undefined },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(true);
    });

    it('skal returnere false når annen part har gradering med aktivitet null', () => {
        const perioder = [
            lagPeriode({
                annenPart: lagFarUttak({
                    gradering: { arbeidstidprosent: 60, aktivitet: null as unknown as undefined },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere true når søkers periode har gradering med ORDINÆRT_ARBEID uten arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorUttak({
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
                søker: lagMorUttak({
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
                søker: lagMorUttak({
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
                søker: lagMorUttak({
                    gradering: { arbeidstidprosent: 60, aktivitet: { type: 'FRILANS' } },
                }),
            }),
        ];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for SELVSTENDIG_NÆRINGSDRIVENDE uten arbeidsgiver', () => {
        const perioder = [
            lagPeriode({
                søker: lagMorUttak({
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
        const perioder = [lagPeriode({ søker: lagMorUttak() })];

        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('skal returnere false for tom liste', () => {
        expect(harPeriodeMedUkjentGraderingsaktivitet([], 'MOR')).toBe(false);
    });
});

describe('finnAntallTidelerÅTrekkeForUttak', () => {
    it('skal runde desimalprosent eksakt ned til 1 desimal utan flyttals-underflyt', () => {
        const periodeMed25Uttaksdager = { fom: '2025-06-02', tom: '2025-07-04' };

        const tideler = finnAntallTidelerÅTrekkeForUttak(
            periodeMed25Uttaksdager,
            lagFarUttak({ samtidigUttak: 9.2 }),
            false,
            '2025-01-01',
        );

        expect(tideler).toBe(23);
    });
});

describe('erAvslåttPeriode', () => {
    const innvilget: UttakDto = {
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        samtidigUttak: 50,
        flerbarnsdager: false,
        resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
    };
    const avslått: UttakDto = {
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        samtidigUttak: 50,
        flerbarnsdager: false,
        resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
    };

    it('skal ikkje rekna samtidig uttak som avslått når berre den eine parten er avslått', () => {
        expect(erAvslåttPeriode({ fom: FOM, tom: FOM, søker: innvilget, annenPart: avslått })).toBe(false);
    });

    it('skal rekna perioden som avslått når alle partar er avslått', () => {
        expect(
            erAvslåttPeriode({ fom: FOM, tom: FOM, søker: { ...avslått, forelder: 'FAR_MEDMOR' }, annenPart: avslått }),
        ).toBe(true);
        expect(erAvslåttPeriode({ fom: FOM, tom: FOM, søker: avslått })).toBe(true);
    });

    it('skal ikkje rekna periode utan partar som avslått', () => {
        expect(erAvslåttPeriode({ fom: FOM, tom: FOM })).toBe(false);
    });
});
