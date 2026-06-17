import { UttakPeriode_fpoversikt, UttakPeriodeAnnenpartEøs_fpoversikt } from '@navikt/fp-types';

import { harBrukerKunSlettetPerioder } from './submitValidering';

const innvilget: UttakPeriode_fpoversikt['resultat'] = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};

const lagPeriode = (overrides: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2024-07-01',
    tom: '2024-07-31',
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    resultat: innvilget,
    ...overrides,
});

const lagEøsPeriode = (overrides: Partial<UttakPeriodeAnnenpartEøs_fpoversikt> = {}): UttakPeriodeAnnenpartEøs_fpoversikt => ({
    fom: '2024-10-01',
    tom: '2024-10-31',
    kontoType: 'FELLESPERIODE',
    trekkdager: 23,
    ...overrides,
});

const A = lagPeriode({ fom: '2024-07-01', tom: '2024-07-31', kontoType: 'MØDREKVOTE' });
const B = lagPeriode({ fom: '2024-08-01', tom: '2024-09-30', kontoType: 'MØDREKVOTE' });
const C = lagPeriode({ fom: '2024-10-01', tom: '2024-12-31', kontoType: 'FELLESPERIODE' });

describe('harBrukerKunSlettetPerioder', () => {
    describe('ingen opprinnelig plan', () => {
        it('returnerer false når opprinneligPlan er undefined', () => {
            expect(harBrukerKunSlettetPerioder([A, B], undefined)).toBe(false);
        });
    });

    describe('bruker har kun slettet perioder', () => {
        it('returnerer true når siste periode er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, B];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når første periode er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [B, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når en periode fra midten er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når alle perioder er slettet og perioder er tom liste', () => {
            const opprinneligPlan = [A, B, C];
            // Tom liste – ingen saksperioder å sjekke, erKunSaksperioder = true (every på tom liste)
            expect(harBrukerKunSlettetPerioder([], opprinneligPlan)).toBe(true);
        });

        it('returnerer true når to av tre perioder er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [B];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('fungerer med EØS-perioder i listen', () => {
            const eøs = lagEøsPeriode();
            const opprinneligPlan = [A, B, eøs];
            const perioder = [A, eøs];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når gjenværende perioder er verdilike, men ikke referanselike (regresjon: TFP-6971)', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [{ ...A }, { ...B }];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });
    });

    describe('bruker har lagt til eller endret perioder', () => {
        it('returnerer false når bruker har lagt til en ny periode', () => {
            const opprinneligPlan = [A, B];
            const nyPeriode = lagPeriode({ fom: '2025-01-01', tom: '2025-01-31' });
            const perioder = [A, B, nyPeriode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når bruker har slettet en periode og lagt til en ny', () => {
            const opprinneligPlan = [A, B, C];
            const nyPeriode = lagPeriode({ fom: '2025-01-01', tom: '2025-01-31' });
            // Totalt kortere enn opprinnelig (2 < 3), men nyPeriode finnes ikke i original
            const perioder = [A, nyPeriode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når en periode er endret (ikke referanselik)', () => {
            const opprinneligPlan = [A, B, C];
            const endretB = lagPeriode({ fom: '2024-08-01', tom: '2024-09-30', kontoType: 'FELLESPERIODE' }); // ny instans
            const perioder = [A, endretB]; // kortere, men endretB er ikke samme referanse som B
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når planene er identiske', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, B, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });
    });

    describe('perioder inneholder ikke-saksperioder (brukerendringer)', () => {
        it('returnerer false når en periode mangler resultat', () => {
            const brukerperiode = lagPeriode({ resultat: undefined });
            const opprinneligPlan = [A, B, C];
            // perioder inneholder en brukerendret periode (ingen resultat)
            const perioder = [A, brukerperiode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });
    });

    describe('perioder er undefined', () => {
        it('returnerer false når perioder er undefined', () => {
            expect(harBrukerKunSlettetPerioder(undefined, [A, B])).toBe(false);
        });
    });
});
