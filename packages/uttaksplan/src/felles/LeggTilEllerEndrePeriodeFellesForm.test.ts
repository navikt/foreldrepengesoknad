import { describe, expect, it } from 'vitest';

import {
    LeggTilEllerEndrePeriodeFormFormValues,
    mapFraFormValuesTilUttakPeriode,
} from './LeggTilEllerEndrePeriodeFellesForm';

const PERIODE = { fom: '2026-01-01', tom: '2026-01-10' };

describe('mapFraFormValuesTilUttakPeriode', () => {
    it('setter gradering til undefined for mor ved overføring selv om gradering-felter er satt i form state', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: '123456789',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'MOR', true);

        expect(periode?.gradering).toBeUndefined();
    });

    it('setter gradering til undefined for far/medmor ved overføring selv om gradering-felter er satt i form state', () => {
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: true,
            stillingsprosentFarMedmor: '40',
            hvorSkalDuJobbe: 'FRILANS',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.gradering).toBeUndefined();
    });

    it('setter gradering-aktivitet frå valgt arbeidsgiver i søknaden (kanVelgeArbeidsgiver = true)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: '123456789',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'MOR', true);

        expect(periode?.gradering?.aktivitet).toEqual({
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

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'MOR', false);

        expect(periode?.gradering?.aktivitet).toEqual({ type: 'ANNET' });
    });

    it('beheld ANNET når plassholdaren ANNET ligg i hvorSkalDuJobbe i søknaden (ikkje reelt valg)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakMor: true,
            stillingsprosentMor: '50',
            hvorSkalDuJobbe: 'ANNET',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'MOR', true);

        expect(periode?.gradering?.aktivitet).toEqual({ type: 'ANNET' });
    });

    it('nullstiller overføringÅrsak for far/medmor når kontoType endres frå MØDREKVOTE (overføring) til FEDREKVOTE (eigen kvote)', () => {
        // Reproduserer feilen der ei "overta mødrekvote"-periode blir endra til fedrekvote,
        // men overføringsårsak heng igjen i form-state og blir feilaktig sendt med vidare.
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'FEDREKVOTE',
            overføringsårsak: 'SYKDOM_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.overføringÅrsak).toBeUndefined();
    });

    it('nullstiller overføringÅrsak for mor når kontoType endres frå FEDREKVOTE (overføring) til MØDREKVOTE (eigen kvote)', () => {
        const values = {
            forelder: 'MOR',
            kontoTypeMor: 'MØDREKVOTE',
            overføringsårsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'MOR', true);

        expect(periode?.overføringÅrsak).toBeUndefined();
    });

    it('beheld overføringÅrsak for far/medmor når kontoType framleis er MØDREKVOTE (reell overføring)', () => {
        const values = {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor: 'MØDREKVOTE',
            overføringsårsak: 'SYKDOM_ANNEN_FORELDER',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const [periode] = mapFraFormValuesTilUttakPeriode(values, PERIODE, 'FAR_MEDMOR', true);

        expect(periode?.overføringÅrsak).toBe('SYKDOM_ANNEN_FORELDER');
    });
});
