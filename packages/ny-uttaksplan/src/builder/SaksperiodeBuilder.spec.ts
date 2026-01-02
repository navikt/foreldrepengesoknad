import { describe, expect, it } from 'vitest';

import { SaksperiodeBuilder } from './SaksperiodeBuilder';

const p = (fom: string, tom: string) => ({ fom, tom });

describe('SaksperiodeBuilder', () => {
    it('adds non-overlapping period', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-05')]);

        builder.leggTilSaksperioder([p('2024-01-10', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-12')]);
    });

    it('fully replaces existing period', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-05', '2024-01-10')]);

        builder.leggTilSaksperioder([p('2024-01-01', '2024-01-31')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-31')]);
    });

    it('splits existing period when overlapping in the middle', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-10')]);

        builder.leggTilSaksperioder([p('2024-01-04', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-03'),
            p('2024-01-04', '2024-01-05'),
            p('2024-01-08', '2024-01-10'),
        ]);
    });

    it('handles multiple overlapping existing periods', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-19')]);

        builder.leggTilSaksperioder([p('2024-01-04', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-03'),
            p('2024-01-04', '2024-01-12'),
            p('2024-01-15', '2024-01-19'),
        ]);
    });

    it('applies multiple incoming periods sequentially', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-19')]);

        builder.leggTilSaksperioder([p('2024-01-05', '2024-01-05'), p('2024-01-10', '2024-01-11')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-05'),
            p('2024-01-08', '2024-01-09'),
            p('2024-01-10', '2024-01-11'),
            p('2024-01-12', '2024-01-19'),
        ]);
    });

    it('skal håndtere å legge til flere perioder som er like', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-19')]);

        builder.leggTilSaksperioder([p('2024-01-05', '2024-01-08'), p('2024-01-05', '2024-01-08')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-08'),
            p('2024-01-05', '2024-01-08'),
            p('2024-01-09', '2024-01-19'),
        ]);
    });

    it('skal håndtere å fjerne to perioder som er like', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-19'), p('2024-01-01', '2024-01-19')]);

        builder.leggTilSaksperioder([p('2024-01-05', '2024-01-08')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-08'),
            p('2024-01-09', '2024-01-19'),
            p('2024-01-09', '2024-01-19'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til periode', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-31')]);

        builder.leggTilSaksperioder([p('2024-01-08', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-05'),
            p('2024-01-08', '2024-01-12'),
            p('2024-01-15', '2024-01-31'),
        ]);
    });
});

describe('SaksperiodeBuilder –.leggTilSaksperioder (shouldReplace = false)', () => {
    it('pushes existing periods forward', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-10', '2024-01-15')]).medForskyvningAvEksisterendePerioder();

        builder.leggTilSaksperioder([p('2024-01-01', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-17', '2024-01-22')]);
    });

    it('pushes overlapping periods forward', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-03', '2024-01-10')]).medForskyvningAvEksisterendePerioder();

        builder.leggTilSaksperioder([p('2024-01-01', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-17')]);
    });

    it('accumulates pushes from multiple additions', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-10', '2024-01-10')]).medForskyvningAvEksisterendePerioder();

        builder.leggTilSaksperioder([p('2024-01-01', '2024-01-02'), p('2024-01-03', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-02'),
            p('2024-01-03', '2024-01-05'),
            p('2024-01-17', '2024-01-17'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til periode', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-31')]).medForskyvningAvEksisterendePerioder();

        builder.leggTilSaksperioder([p('2024-01-08', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-05'),
            p('2024-01-08', '2024-01-12'),
            p('2024-01-15', '2024-02-07'),
        ]);
    });
});

describe('SaksperiodeBuilder – safety and ordering', () => {
    it('always returns sorted periods', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-10', '2024-01-12'), p('2024-01-01', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-12')]);
    });

    it('does not expose internal mutation', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-05')]);

        const result = builder.getSaksperioder();
        result.push(p('2099-01-01', '2099-01-02'));

        expect(builder.getSaksperioder()).toHaveLength(1);
    });
});

describe('SaksperiodeBuilder.removePeriod', () => {
    it('removes a period completely contained in an existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-05', tom: '2024-01-08' }]);

        expect(builder.getSaksperioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-09', tom: '2024-01-10' },
        ]);
    });

    it('removes a period overlapping start of existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-01', tom: '2024-01-08' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-09', tom: '2024-01-10' }]);
    });

    it('removes a period overlapping end of existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-08', tom: '2024-01-15' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-05' }]);
    });

    it('removes a period that fully overlaps existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-01', tom: '2024-01-15' }]);

        expect(builder.getSaksperioder()).toEqual([]);
    });

    it('keeps gaps after removal (no merging)', () => {
        const builder = new SaksperiodeBuilder([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-05', tom: '2024-01-10' },
        ]);

        builder.fjernSaksperioder([{ fom: '2024-01-04', tom: '2024-01-05' }]);

        expect(builder.getSaksperioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-03' },
            { fom: '2024-01-08', tom: '2024-01-10' },
        ]);
    });

    it('dont remove period when not overlapping anything', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-11', tom: '2024-01-12' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-10' }]);
    });

    it('Fjern periode som overlapper eksakt eksisterende', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        builder.fjernSaksperioder([{ fom: '2024-01-01', tom: '2024-01-10' }]);

        expect(builder.getSaksperioder()).toEqual([]);
    });

    it('Skal ta hensyn til helgedager når en fjerner periode', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-31')]).medForskyvningAvEksisterendePerioder();

        builder.fjernSaksperioder([p('2024-01-08', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-15', '2024-01-31')]);
    });
});
