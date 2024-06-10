import { getNavnGenitivEierform } from './stringUtils';

describe('stringUtils', () => {
    it('skal legge s til navn som ikke slutter på s', () => {
        const verdi = getNavnGenitivEierform('Espen', 'nb');
        expect(verdi).toBe('Espens');
    });

    it('skal ikke legge s til navn som slutter på s', () => {
        const verdi = getNavnGenitivEierform('Thomas', 'nb');
        expect(verdi).toBe(`Thomas'`);
    });
});
