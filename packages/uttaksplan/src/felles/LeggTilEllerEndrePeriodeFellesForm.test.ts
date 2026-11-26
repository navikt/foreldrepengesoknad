import { describe, expect, it } from 'vitest';

import { UttakPeriodeDto } from '@navikt/fp-types';

import { harPeriodeMedUkjentGraderingsaktivitet } from '../utils/periodeUtils';
import {
    LeggTilEllerEndrePeriodeFormFormValues,
    beholdLåstAnnenPartsSamtidigeUttak,
    lagDefaultValuesForValgtePerioder,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilPeriodeDto,
} from './LeggTilEllerEndrePeriodeFellesForm';

const PERIODE = { fom: '2026-01-01', tom: '2026-01-10' };

describe('mapFraFormValuesTilPeriodeDto', () => {
    it('returnerer ingen perioder når forelder ikke er valgt', () => {
        expect(mapFraFormValuesTilPeriodeDto({}, PERIODE, 'MOR', true)).toEqual([]);
    });

    it.each(['MOR', 'FAR_MEDMOR'] as const)(
        'samler begge foreldrenes uttak i samme intervall når søker er %s',
        (søker) => {
            const values = {
                forelder: 'BEGGE',
                kontoTypeMor: 'MØDREKVOTE',
                kontoTypeFarMedmor: 'AKTIVITETSFRI_KVOTE',
                morsAktivitet: 'ARBEID',
                skalDuKombinereArbeidOgUttakMor: true,
                skalDuKombinereArbeidOgUttakFarMedmor: true,
                stillingsprosentMor: '30',
                stillingsprosentFarMedmor: '60',
                samtidigUttaksprosentMor: '70',
                samtidigUttaksprosentFarMedmor: '40',
                hvorSkalDuJobbe: '123456789',
                ønskerFlerbarnsdager: true,
            } satisfies LeggTilEllerEndrePeriodeFormFormValues;

            const perioder = mapFraFormValuesTilPeriodeDto(values, PERIODE, søker, true);
            const mor = {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                morsAktivitet: 'ARBEID',
                gradering: { arbeidstidprosent: 30 },
                samtidigUttak: 70,
                overføringÅrsak: undefined,
                flerbarnsdager: true,
            };
            const farMedmor = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                gradering: { arbeidstidprosent: 60 },
                samtidigUttak: 40,
                overføringÅrsak: undefined,
                flerbarnsdager: true,
            };
            const søkersUttak = søker === 'MOR' ? mor : farMedmor;

            expect(perioder).toEqual([
                {
                    ...PERIODE,
                    søker: {
                        ...søkersUttak,
                        gradering: {
                            ...søkersUttak.gradering,
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: { id: '123456789' },
                            },
                        },
                    },
                    annenPart: søker === 'MOR' ? farMedmor : mor,
                },
            ]);
        },
    );

    it.each([
        { forelder: 'MOR', søker: 'MOR' },
        { forelder: 'MOR', søker: 'FAR_MEDMOR' },
        { forelder: 'FAR_MEDMOR', søker: 'MOR' },
        { forelder: 'FAR_MEDMOR', søker: 'FAR_MEDMOR' },
    ] as const)('plasserer enkeltuttak på riktig part: %j', ({ forelder, søker }) => {
        const values = {
            forelder,
            kontoTypeMor: 'AKTIVITETSFRI_KVOTE',
            kontoTypeFarMedmor: 'FEDREKVOTE',
            morsAktivitet: 'ARBEID',
            samtidigUttaksprosentMor: '70',
            samtidigUttaksprosentFarMedmor: '40',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;
        const uttak = {
            forelder,
            kontoType: forelder === 'MOR' ? 'FORELDREPENGER' : 'FEDREKVOTE',
            morsAktivitet: 'ARBEID',
            gradering: undefined,
            samtidigUttak: undefined,
            overføringÅrsak: undefined,
            flerbarnsdager: false,
        };

        expect(mapFraFormValuesTilPeriodeDto(values, PERIODE, søker, true)).toEqual([
            {
                ...PERIODE,
                søker: forelder === søker ? uttak : undefined,
                annenPart: forelder === søker ? undefined : uttak,
            },
        ]);
    });

    it('setter gradering til undefined for mor ved overføring selv om gradering-felter er satt i form state', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: '123456789',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', true);

        expect(periode?.søker?.gradering).toBeUndefined();
    });

    it('setter gradering til undefined for far/medmor ved overføring selv om gradering-felter er satt i form state', () => {
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: true,
            stillingsprosentFarMedmor: '40',
            hvorSkalDuJobbe: 'FRILANS',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.søker?.gradering).toBeUndefined();
    });

    it('setter gradering-aktivitet frå valgt arbeidsgiver i søknaden (kanVelgeArbeidsgiver = true)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: '123456789',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', true);

        expect(periode?.søker?.gradering?.aktivitet).toEqual({
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: { id: '123456789' },
        });
    });

    it('setter ikkje gradering-aktivitet i planleggaren (kanVelgeArbeidsgiver = false)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: '123456789',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', false);

        expect(periode?.søker?.gradering).toEqual({ arbeidstidprosent: 50 });
    });

    it('fjernar markeringa for manglande aktivitet når brukaren vel arbeidsgiver for ein periode med aktivitet null', () => {
        const periodeUtenAktivitet: UttakPeriodeDto = {
            ...PERIODE,
            søker: {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                gradering: { arbeidstidprosent: 50, aktivitet: null as unknown as undefined },
            },
        };
        expect(harPeriodeMedUkjentGraderingsaktivitet([periodeUtenAktivitet], 'MOR')).toBe(true);

        const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
            [periodeUtenAktivitet],
            PERIODE,
            'MOR',
            false,
        );
        expect(defaultValues?.hvorSkalDuJobbe).toBeUndefined();

        const perioder = mapFraFormValuesTilPeriodeDto(
            { ...defaultValues, hvorSkalDuJobbe: '123456789' },
            PERIODE,
            'MOR',
            true,
        );

        expect(perioder[0]?.søker?.gradering?.aktivitet).toEqual({
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: { id: '123456789' },
        });
        expect(harPeriodeMedUkjentGraderingsaktivitet(perioder, 'MOR')).toBe(false);
    });

    it('setter ikkje gradering-aktivitet når hvorSkalDuJobbe ikkje er valt i søknaden', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', true);

        expect(periode?.søker?.gradering).toEqual({ arbeidstidprosent: 50 });
    });

    it('nullstiller overføringÅrsak for far/medmor når kontoType endres frå MØDREKVOTE (overføring) til FEDREKVOTE (eigen kvote)', () => {
        // Reproduserer feilen der ei "overta mødrekvote"-periode blir endra til fedrekvote,
        // men overføringsårsak heng igjen i form-state og blir feilaktig sendt med vidare.
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'FEDREKVOTE',
            overføringsårsak: 'SYKDOM_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.søker?.overføringÅrsak).toBeUndefined();
    });

    it('nullstiller overføringÅrsak for mor når kontoType endres frå FEDREKVOTE (overføring) til MØDREKVOTE (eigen kvote)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            overføringsårsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', true);

        expect(periode?.søker?.overføringÅrsak).toBeUndefined();
    });

    it('beheld overføringÅrsak for far/medmor når kontoType framleis er MØDREKVOTE (reell overføring)', () => {
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'MØDREKVOTE',
            overføringsårsak: 'SYKDOM_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.søker?.overføringÅrsak).toBe('SYKDOM_ANNEN_FORELDER');
    });
});

describe('lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm med samtidig uttak', () => {
    const periode: UttakPeriodeDto = {
        fom: '2027-03-15',
        tom: '2027-04-02',
        søker: {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            morsAktivitet: 'ARBEID',
            samtidigUttak: 50,
            flerbarnsdager: false,
        },
        annenPart: {
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            samtidigUttak: 50,
            flerbarnsdager: false,
        },
    };

    it.each([false, true])(
        'forhåndsfyller mors aktivitet oppgitt av far/medmor når annen part er låst: %s',
        (erLåst) => {
            expect(
                lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm([periode], periode, 'FAR_MEDMOR', erLåst)
                    ?.morsAktivitet,
            ).toBe('ARBEID');
        },
    );

    it('bruker mors aktivitet når far/medmor ikke har oppgitt den', () => {
        const periodeMedAktivitetHosMor: UttakPeriodeDto = {
            ...periode,
            søker: { ...periode.søker!, morsAktivitet: undefined },
            annenPart: { ...periode.annenPart!, morsAktivitet: 'UTDANNING' },
        };

        expect(
            lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
                [periodeMedAktivitetHosMor],
                periodeMedAktivitetHosMor,
                'FAR_MEDMOR',
                false,
            )?.morsAktivitet,
        ).toBe('UTDANNING');
    });

    it('prioriterer fars/medmors oppgitte mors aktivitet når begge har verdi', () => {
        const periodeMedUlikeAktiviteter: UttakPeriodeDto = {
            ...periode,
            annenPart: { ...periode.annenPart!, morsAktivitet: 'UTDANNING' },
        };

        expect(
            lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
                [periodeMedUlikeAktiviteter],
                periodeMedUlikeAktiviteter,
                'FAR_MEDMOR',
                false,
            )?.morsAktivitet,
        ).toBe('ARBEID');
    });

    it('gir ingen startverdier når den andre forelderen har utsettelse i perioden', () => {
        const periodeMedUtsettelse: UttakPeriodeDto = {
            ...periode,
            annenPart: { forelder: 'MOR', utsettelseÅrsak: 'ARBEID', flerbarnsdager: false },
        };

        expect(
            lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
                [periodeMedUtsettelse],
                periodeMedUtsettelse,
                'FAR_MEDMOR',
                false,
            ),
        ).toBeUndefined();
    });

    it('forhåndsfyller ikke prosent som mangler, slik at den ikke lagres uten at brukeren oppgir den', () => {
        const periodeUtenSøkersProsent: UttakPeriodeDto = {
            ...periode,
            søker: { ...periode.søker!, samtidigUttak: undefined },
        };

        const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
            [periodeUtenSøkersProsent],
            periodeUtenSøkersProsent,
            'FAR_MEDMOR',
            true,
        );

        expect(defaultValues?.samtidigUttaksprosentFarMedmor).toBeUndefined();
        expect(defaultValues?.samtidigUttaksprosentMor).toBe('50');
        expect(
            mapFraFormValuesTilPeriodeDto(
                { ...defaultValues, morsAktivitet: 'UTDANNING' },
                periodeUtenSøkersProsent,
                'FAR_MEDMOR',
                false,
            )[0]?.søker?.samtidigUttak,
        ).toBeUndefined();
    });
});

describe('lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm med låst annen part', () => {
    const morsPeriode: UttakPeriodeDto = {
        ...PERIODE,
        annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
    };

    it('gir tomt skjema når annen part ikke har samtidig uttak', () => {
        expect(
            lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm([morsPeriode], PERIODE, 'FAR_MEDMOR', true),
        ).toBeUndefined();
    });

    it('forhåndsvelger begge med annen parts uttak når annen part har samtidig uttak', () => {
        const periode = { ...morsPeriode, annenPart: { ...morsPeriode.annenPart!, samtidigUttak: 50 } };

        expect(lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm([periode], PERIODE, 'FAR_MEDMOR', true)).toEqual(
            expect.objectContaining({ forelder: 'BEGGE', kontoTypeMor: 'MØDREKVOTE', samtidigUttaksprosentMor: '50' }),
        );
    });

    it('forhåndsfyller fars samtidige uttaksprosent når mor søker mot fars låste periode', () => {
        const farsPeriode: UttakPeriodeDto = {
            ...PERIODE,
            annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false, samtidigUttak: 50 },
        };

        expect(lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm([farsPeriode], PERIODE, 'MOR', true)).toEqual(
            expect.objectContaining({
                forelder: 'BEGGE',
                kontoTypeFarMedmor: 'FEDREKVOTE',
                samtidigUttaksprosentFarMedmor: '50',
            }),
        );
    });
});

describe('lagDefaultValuesForValgtePerioder med låst annen part', () => {
    const samtidigPeriode: UttakPeriodeDto = {
        fom: '2026-01-05',
        tom: '2026-01-09',
        annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false, samtidigUttak: 50 },
    };
    const periodeUtenSamtidigUttak: UttakPeriodeDto = {
        fom: '2026-01-12',
        tom: '2026-01-16',
        annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
    };
    const perioder = [samtidigPeriode, periodeUtenSamtidigUttak];
    const valgtSamtidig = { fom: '2026-01-05', tom: '2026-01-05' };
    const valgtUtenSamtidig = { fom: '2026-01-14', tom: '2026-01-14' };

    it.each([
        ['samtidig uttak først', [valgtSamtidig, valgtUtenSamtidig]],
        ['samtidig uttak sist', [valgtUtenSamtidig, valgtSamtidig]],
    ])('forhåndsutfyller ikke når valgte intervaller ligger i ulike perioder (%s)', (_, valgte) => {
        expect(lagDefaultValuesForValgtePerioder(perioder, valgte, 'FAR_MEDMOR', true)).toBeUndefined();
    });

    it('forhåndsvelger begge når alle valgte intervaller ligger i samme periode med samtidig uttak', () => {
        const valgte = [valgtSamtidig, { fom: '2026-01-08', tom: '2026-01-09' }];

        expect(lagDefaultValuesForValgtePerioder(perioder, valgte, 'FAR_MEDMOR', true)).toEqual(
            expect.objectContaining({ forelder: 'BEGGE', kontoTypeMor: 'MØDREKVOTE' }),
        );
    });
});

describe('beholdLåstAnnenPartsSamtidigeUttak', () => {
    const farsLåsteUttak = {
        kontoType: 'FEDREKVOTE',
        forelder: 'FAR_MEDMOR',
        samtidigUttak: 50,
        flerbarnsdager: false,
        resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
    } satisfies UttakPeriodeDto['annenPart'];

    const eksisterende = [
        {
            fom: '2026-01-01',
            tom: '2026-01-31',
            søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', samtidigUttak: 50, flerbarnsdager: false },
            annenPart: farsLåsteUttak,
        },
    ] satisfies UttakPeriodeDto[];

    const nyPeriode = {
        fom: '2026-01-05',
        tom: '2026-01-09',
        søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', samtidigUttak: 60, flerbarnsdager: false },
        annenPart: { kontoType: 'FEDREKVOTE', forelder: 'FAR_MEDMOR', samtidigUttak: 40, flerbarnsdager: false },
    } satisfies UttakPeriodeDto;

    it('beholder hele annen parts låste uttak når søker endrer sin del', () => {
        expect(beholdLåstAnnenPartsSamtidigeUttak([nyPeriode], eksisterende, true)).toEqual([
            { ...nyPeriode, annenPart: farsLåsteUttak },
        ]);
    });

    it('legger ikke annen parts samtidige uttak tilbake når søker ikke har oppgitt samtidig uttak', () => {
        const kunMor = mapFraFormValuesTilPeriodeDto(
            { forelder: 'MOR', kontoTypeMor: 'MØDREKVOTE' },
            { fom: nyPeriode.fom, tom: nyPeriode.tom },
            'MOR',
            true,
        );
        expect(beholdLåstAnnenPartsSamtidigeUttak(kunMor, eksisterende, true)).toEqual(kunMor);
    });

    it('endrer ingenting når annen parts perioder ikke er låst', () => {
        expect(beholdLåstAnnenPartsSamtidigeUttak([nyPeriode], eksisterende, false)).toEqual([nyPeriode]);
    });
});
