import { describe, expect, it } from 'vitest';

import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { UttakPeriodeBuilder } from './UttakPeriodeBuilder';

// Bruker forelder for å skille på eksisterende og nye perioder.
const lagPeriode = (fom: string, tom: string) => ({ fom, tom, forelder: 'MOR' as BrukerRolleSak_fpoversikt });
const lagNyPeriode = (fom: string, tom: string) => ({ fom, tom, forelder: 'FAR_MEDMOR' as BrukerRolleSak_fpoversikt });

describe('UttakPeriodeBuilder.leggTilUttakPerioder', () => {
    it('skal legge til ny periode som ikke overlapper eksisterende', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-05')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-10', '2024-01-12')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-10', '2024-01-12'),
        ]);
    });

    it('skal erstatte eksisterende periode når ny overlapper den fullstendig', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-31')]);

        expect(builder.getUttakPerioder()).toEqual([lagNyPeriode('2024-01-01', '2024-01-31')]);
    });

    it('skal erstatte eksisterende periode som ny periode eksakt overlapper', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-05', '2024-01-10')]);

        expect(builder.getUttakPerioder()).toEqual([lagNyPeriode('2024-01-05', '2024-01-10')]);
    });

    it('skal splitte eksisterende periode i to slik at en får tre perioder', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-04', '2024-01-05')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-03'),
            lagNyPeriode('2024-01-04', '2024-01-05'),
            lagPeriode('2024-01-08', '2024-01-10'),
        ]);
    });

    it('skal håndtere flere overlappende perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-19'),
        ]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-04', '2024-01-12')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-03'),
            lagNyPeriode('2024-01-04', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-01-19'),
        ]);
    });

    it('skal håndtere flere overlappende nye perioder', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-19')]);

        builder.leggTilUttakPerioder([
            lagNyPeriode('2024-01-05', '2024-01-05'),
            lagNyPeriode('2024-01-10', '2024-01-11'),
        ]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-05'),
            lagPeriode('2024-01-08', '2024-01-09'),
            lagNyPeriode('2024-01-10', '2024-01-11'),
            lagPeriode('2024-01-12', '2024-01-19'),
        ]);
    });

    it('skal håndtere å legge til flere perioder som er like', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-19')]);

        builder.leggTilUttakPerioder([
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
        ]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagPeriode('2024-01-09', '2024-01-19'),
        ]);
    });

    it('skal håndtere å fjerne to perioder som er like', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-19'),
            lagPeriode('2024-01-01', '2024-01-19'),
        ]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-05', '2024-01-08')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagPeriode('2024-01-09', '2024-01-19'),
            lagPeriode('2024-01-09', '2024-01-19'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-31')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-08', '2024-01-12')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-08', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-01-31'),
        ]);
    });
});

describe('UttakPeriodeBuilder.leggTilUttakPerioder (skalErstatteEksisterendePerioder = false)', () => {
    it('skal dytte eksisterende perioder frem', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-10', '2024-01-15'),
        ]).medForskyvningAvEksisterendePerioder(true);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-05')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-17', '2024-01-22'),
        ]);
    });

    it('skal dytte overlappende perioder frem', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-03', '2024-01-10'),
        ]).medForskyvningAvEksisterendePerioder(true);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-05')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-17'),
        ]);
    });

    it('skal dytte eksisterende perioder frem når det er flere nye perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-10', '2024-01-10'),
        ]).medForskyvningAvEksisterendePerioder(true);

        builder.leggTilUttakPerioder([
            lagNyPeriode('2024-01-01', '2024-01-02'),
            lagNyPeriode('2024-01-03', '2024-01-05'),
        ]);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-02'),
            lagNyPeriode('2024-01-03', '2024-01-05'),
            lagPeriode('2024-01-17', '2024-01-17'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-31'),
        ]).medForskyvningAvEksisterendePerioder(true);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-08', '2024-01-12')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-08', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-02-07'),
        ]);
    });
});

describe('UttakPeriodeBuilder – sortering og mutasjon', () => {
    it('skal returnere sorterte perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-10', '2024-01-12'),
            lagPeriode('2024-01-01', '2024-01-05'),
        ]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-12'),
        ]);
    });

    it('skal ikke eksponere intern mutasjon', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-05')]);

        const result = builder.getUttakPerioder();
        result.push(lagPeriode('2099-01-01', '2099-01-02'));

        expect(builder.getUttakPerioder()).toHaveLength(1);
    });
});

describe('UttakPeriodeBuilder.fjernUttakPerioder', () => {
    it('skal fjerne en periode som overlapper en del midt inni en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-05', tom: '2024-01-08' }]);

        expect(builder.getUttakPerioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-09', tom: '2024-01-10' },
        ]);
    });

    it('skal fjerne en periode som overlapper starten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-08' }]);

        expect(builder.getUttakPerioder()).toEqual([{ fom: '2024-01-09', tom: '2024-01-10' }]);
    });

    it('skal fjerne en periode som overlapper slutten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-08', tom: '2024-01-15' }]);

        expect(builder.getUttakPerioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-05' }]);
    });

    it('skal fjerne en periode som overlapper helt med en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-15' }]);

        expect(builder.getUttakPerioder()).toEqual([]);
    });

    it('skal beholde mellomrom etter fjerning', () => {
        const builder = new UttakPeriodeBuilder([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-05', tom: '2024-01-10' },
        ]);

        builder.fjernUttakPerioder([{ fom: '2024-01-04', tom: '2024-01-05' }]);

        expect(builder.getUttakPerioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-03' },
            { fom: '2024-01-08', tom: '2024-01-10' },
        ]);
    });

    it('skal ikke fjerne periode som ikke overlapper med noe', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-11', tom: '2024-01-12' }]);

        expect(builder.getUttakPerioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-10' }]);
    });

    it('skal fjerne en periode som overlapper eksakt eksisterende', () => {
        const builder = new UttakPeriodeBuilder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        expect(builder.getUttakPerioder()).toEqual([]);
    });

    it('skal ta hensyn til helgedager når en fjerner lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-31'),
        ]).medForskyvningAvEksisterendePerioder(true);

        builder.fjernUttakPerioder([lagPeriode('2024-01-08', '2024-01-12')]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-15', '2024-01-31'),
        ]);
    });
});
