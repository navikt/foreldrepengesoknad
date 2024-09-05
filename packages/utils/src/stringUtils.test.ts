import { capitalizeFirstLetterInEveryWordOnly, getNavnGenitivEierform } from './stringUtils';

describe('stringUtils', () => {
    it('skal legge s til navn som ikke slutter på s', () => {
        const verdi = getNavnGenitivEierform('Espen', 'nb');
        expect(verdi).toBe('Espens');
    });

    it('skal ikke legge s til navn som slutter på s', () => {
        const verdi = getNavnGenitivEierform('Thomas', 'nb');
        expect(verdi).toBe(`Thomas'`);
    });

    it('skal transformere strenger korrekt', () => {
        expect(capitalizeFirstLetterInEveryWordOnly('OMSORGSPARTNER VESTFOLD AS')).toBe('Omsorgspartner Vestfold AS');
        expect(capitalizeFirstLetterInEveryWordOnly('RE KOMMUNE BRÅR 12 OG 13')).toBe('Re Kommune Brår 12 og 13');
    });
});
