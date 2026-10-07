import { describe, expect, it } from 'vitest';

import {
    LeggTilEllerEndrePeriodeFormFormValues,
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
                gradering: { aktivitet: { type: 'ANNET' }, arbeidstidprosent: 30 },
                samtidigUttak: 70,
                overføringÅrsak: undefined,
                flerbarnsdager: true,
            };
            const farMedmor = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                gradering: { aktivitet: { type: 'ANNET' }, arbeidstidprosent: 60 },
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

    it('setter gradering-aktivitet til ANNET i planleggaren (kanVelgeArbeidsgiver = false)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', false);

        expect(periode?.søker?.gradering?.aktivitet).toEqual({ type: 'ANNET' });
    });

    it('beheld ANNET når plassholdaren ANNET ligg i hvorSkalDuJobbe i søknaden (ikkje reelt valg)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: 'ANNET',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilPeriodeDto(values, PERIODE, 'MOR', true);

        expect(periode?.søker?.gradering?.aktivitet).toEqual({ type: 'ANNET' });
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
