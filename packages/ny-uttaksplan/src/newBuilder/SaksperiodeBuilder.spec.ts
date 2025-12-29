import { describe, expect, it } from 'vitest';

import { SaksperiodeBuilder } from './SaksperiodeBuilder';

const p = (fom: string, tom: string) => ({ fom, tom });

describe('SaksperiodeBuilder', () => {
    it('adds non-overlapping period', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-05')]);

        builder.addPeriods([p('2024-01-10', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-12')]);
    });

    it('fully replaces existing period', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-05', '2024-01-10')]);

        builder.addPeriods([p('2024-01-01', '2024-01-31')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-31')]);
    });

    it('splits existing period when overlapping in the middle', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-10')]);

        builder.addPeriods([p('2024-01-04', '2024-01-06')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-03'),
            p('2024-01-04', '2024-01-06'),
            p('2024-01-07', '2024-01-10'),
        ]);
    });

    it('handles multiple overlapping existing periods', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-05'), p('2024-01-10', '2024-01-20')]);

        builder.addPeriods([p('2024-01-04', '2024-01-12')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-03'),
            p('2024-01-04', '2024-01-12'),
            p('2024-01-13', '2024-01-20'),
        ]);
    });

    it('applies multiple incoming periods sequentially', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-20')]);

        builder.addPeriods([p('2024-01-05', '2024-01-06'), p('2024-01-10', '2024-01-11')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-06'),
            p('2024-01-07', '2024-01-09'),
            p('2024-01-10', '2024-01-11'),
            p('2024-01-12', '2024-01-20'),
        ]);
    });

    it('skal håndtere å legge til flere perioder som er like', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-20')]);

        builder.addPeriods([p('2024-01-05', '2024-01-06'), p('2024-01-05', '2024-01-06')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-06'),
            p('2024-01-05', '2024-01-06'),
            p('2024-01-07', '2024-01-20'),
        ]);
    });

    it('skal håndtere å fjerne to perioder som er like', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-01', '2024-01-20'), p('2024-01-01', '2024-01-20')]);

        builder.addPeriods([p('2024-01-05', '2024-01-06')]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-04'),
            p('2024-01-01', '2024-01-04'),
            p('2024-01-05', '2024-01-06'),
            p('2024-01-07', '2024-01-20'),
            p('2024-01-07', '2024-01-20'),
        ]);
    });
});

describe('SaksperiodeBuilder – addPeriods (shouldReplace = false)', () => {
    it('pushes existing periods forward', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-10', '2024-01-15')]).withPushExisting();

        builder.addPeriods([p('2024-01-01', '2024-01-05')]); // 5 days

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-15', '2024-01-20')]);
    });

    it('pushes overlapping periods forward', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-03', '2024-01-10')]).withPushExisting();

        builder.addPeriods([p('2024-01-01', '2024-01-05')]);

        expect(builder.getSaksperioder()).toEqual([p('2024-01-01', '2024-01-05'), p('2024-01-08', '2024-01-15')]);
    });

    it('accumulates pushes from multiple additions', () => {
        const builder = new SaksperiodeBuilder([p('2024-01-10', '2024-01-10')]).withPushExisting();

        builder.addPeriods([
            p('2024-01-01', '2024-01-02'), // +2
            p('2024-01-03', '2024-01-05'), // +3
        ]);

        expect(builder.getSaksperioder()).toEqual([
            p('2024-01-01', '2024-01-02'),
            p('2024-01-03', '2024-01-05'),
            p('2024-01-15', '2024-01-15'),
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

        builder.removePeriods([{ fom: '2024-01-05', tom: '2024-01-06' }]);

        expect(builder.getSaksperioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-07', tom: '2024-01-10' },
        ]);
    });

    it('removes a period overlapping start of existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.removePeriods([{ fom: '2024-01-01', tom: '2024-01-06' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-07', tom: '2024-01-10' }]);
    });

    it('removes a period overlapping end of existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.removePeriods([{ fom: '2024-01-08', tom: '2024-01-15' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-07' }]);
    });

    it('removes a period that fully overlaps existing period', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.removePeriods([{ fom: '2024-01-01', tom: '2024-01-15' }]);

        expect(builder.getSaksperioder()).toEqual([]);
    });

    it('keeps gaps after removal (no merging)', () => {
        const builder = new SaksperiodeBuilder([
            { fom: '2024-01-01', tom: '2024-01-04' },
            { fom: '2024-01-05', tom: '2024-01-10' },
        ]);

        builder.removePeriods([{ fom: '2024-01-04', tom: '2024-01-05' }]);

        expect(builder.getSaksperioder()).toEqual([
            { fom: '2024-01-01', tom: '2024-01-03' },
            { fom: '2024-01-06', tom: '2024-01-10' },
        ]);
    });

    it('removes a period not overlapping anything', () => {
        const builder = new SaksperiodeBuilder([{ fom: '2024-01-05', tom: '2024-01-10' }]);

        builder.removePeriods([{ fom: '2024-01-11', tom: '2024-01-12' }]);

        expect(builder.getSaksperioder()).toEqual([{ fom: '2024-01-05', tom: '2024-01-10' }]);
    });
});
