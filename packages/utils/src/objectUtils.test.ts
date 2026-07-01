import { erLikUansettRekkefølge } from './objectUtils';

describe('erLikUansettRekkefølge', () => {
    it('skal rekne to primitive verdiar som like når dei er identiske', () => {
        expect(erLikUansettRekkefølge('a', 'a')).toBe(true);
        expect(erLikUansettRekkefølge(1, 1)).toBe(true);
        expect(erLikUansettRekkefølge('a', 'b')).toBe(false);
    });

    it('skal ignorere rekkefølgja på element i ein array', () => {
        expect(erLikUansettRekkefølge([1, 2, 3], [3, 2, 1])).toBe(true);
    });

    it('skal ignorere rekkefølgja på objekt i ein array', () => {
        const a = [
            { id: 1, navn: 'Ola' },
            { id: 2, navn: 'Kari' },
        ];
        const b = [
            { id: 2, navn: 'Kari' },
            { id: 1, navn: 'Ola' },
        ];
        expect(erLikUansettRekkefølge(a, b)).toBe(true);
    });

    it('skal ignorere rekkefølgja på nøstede arrays', () => {
        const a = { barn: [{ perioder: [1, 2] }, { perioder: [3, 4] }] };
        const b = { barn: [{ perioder: [4, 3] }, { perioder: [2, 1] }] };
        expect(erLikUansettRekkefølge(a, b)).toBe(true);
    });

    it('skal ignorere rekkefølgja på nøklar i eit objekt', () => {
        expect(erLikUansettRekkefølge({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('skal oppdage faktiske skilnadar i innhald', () => {
        expect(erLikUansettRekkefølge([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(erLikUansettRekkefølge({ a: 1 }, { a: 2 })).toBe(false);
        expect(erLikUansettRekkefølge([{ id: 1 }], [{ id: 1 }, { id: 2 }])).toBe(false);
    });
});
