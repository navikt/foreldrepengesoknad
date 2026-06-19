import { describe, expect, it } from 'vitest';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { finnUgyldigSamtidigUttakOverlapp } from './LeggTilEllerEndrePeriodeFellesForm';

const morsPeriode = (overstyr: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2026-05-01',
    tom: '2026-05-31',
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    ...overstyr,
});

const farsPeriode = (overstyr: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2026-05-01',
    tom: '2026-05-31',
    forelder: 'FAR_MEDMOR',
    kontoType: 'FEDREKVOTE',
    flerbarnsdager: false,
    ...overstyr,
});

const valgtPeriode = { fom: '2026-05-10', tom: '2026-05-20' };

describe('finnUgyldigSamtidigUttakOverlapp', () => {
    it('returnerer undefined for eit gyldig samtidig-uttak-par (begge samtidigUttak, mor + far)', () => {
        const perioder = [morsPeriode({ samtidigUttak: 50 }), farsPeriode({ samtidigUttak: 50 })];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false)).toBeUndefined();
    });

    it('flaggar to overlappande periodar der berre éin har samtidigUttak', () => {
        const perioder = [morsPeriode({ samtidigUttak: 50 }), farsPeriode()];

        const resultat = finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false);

        expect(resultat).toEqual([perioder[0], perioder[1]]);
    });

    it('flaggar to overlappande periodar der ingen har samtidigUttak', () => {
        const perioder = [morsPeriode(), farsPeriode()];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false)).toEqual([
            perioder[0],
            perioder[1],
        ]);
    });

    it('flaggar to overlappande periodar for same forelder sjølv om begge har samtidigUttak', () => {
        const perioder = [morsPeriode({ samtidigUttak: 50 }), morsPeriode({ samtidigUttak: 50 })];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false)).toEqual([
            perioder[0],
            perioder[1],
        ]);
    });

    it('returnerer undefined når berre éin periode omsluttar valgtPeriode', () => {
        const perioder = [morsPeriode()];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false)).toBeUndefined();
    });

    it('returnerer undefined når annen parts periodar er låste (handterast ikkje som redigerbart par)', () => {
        const perioder = [morsPeriode(), farsPeriode()];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', true)).toBeUndefined();
    });

    it('flaggar ikkje periodar som ikkje omsluttar heile valgtPeriode', () => {
        const perioder = [
            morsPeriode({ tom: '2026-05-15' }),
            farsPeriode({ tom: '2026-05-15' }),
        ];

        expect(finnUgyldigSamtidigUttakOverlapp(perioder, valgtPeriode, 'MOR', false)).toBeUndefined();
    });
});
