import { describe, expect, it } from 'vitest';

import {
    countryIsMemberOfEøsOrEfta,
    createCountryOptions,
    filteredListEØSCountries,
    getAlpha3Code,
    getCountryName,
} from './countryUtils';

describe('createCountryOptions', () => {
    it('returnerer landkoder som alpha3-koder', () => {
        const options = createCountryOptions('nb');
        const sverige = options.find(([, name]) => name === 'Sverige');
        expect(sverige?.[0]).toBe('SWE');
    });

    it.each([
        ['nn', 'Sverige'],
        ['en', 'Sweden'],
        ['en-US', 'Sweden'],
    ])('bruker landnavn på valgt språk (%s) med uendret alpha3-kode', (locale, navn) => {
        const options = createCountryOptions(locale);
        expect(options.find(([code]) => code === 'SWE')?.[1]).toBe(navn);
        expect(options.find(([code]) => code === 'XXK')?.[1]).toBe('Kosovo');
    });

    it('filtrerer ut Antarktis', () => {
        const options = createCountryOptions('nb');
        expect(options.some(([code]) => code === 'ATA')).toBe(false);
    });

    it('tar med Norge som standard', () => {
        expect(createCountryOptions('nb').some(([code]) => code === 'NOR')).toBe(true);
    });

    it('filtrerer ut Norge når utenNorge er satt', () => {
        const options = createCountryOptions('nb', { utenNorge: true });
        expect(options.some(([code]) => code === 'NOR')).toBe(false);
        expect(options.some(([code]) => code === 'SWE')).toBe(true);
    });
});

describe('filteredListEØSCountries', () => {
    it('godkjenner alpha3-koder for EØS-/EFTA-land når filtrering er på', () => {
        expect(filteredListEØSCountries('SWE', true)).toBe(true);
        expect(filteredListEØSCountries('NOR', true)).toBe(true);
    });

    it('avviser land utenfor EØS/EFTA når filtrering er på', () => {
        expect(filteredListEØSCountries('USA', true)).toBe(false);
    });

    it('filtrerer kun ut Antarktis når filtrering er av', () => {
        expect(filteredListEØSCountries('ATA', false)).toBe(false);
        expect(filteredListEØSCountries('USA', false)).toBe(true);
    });
});

describe('countryIsMemberOfEøsOrEfta', () => {
    it('godkjenner alpha3-koder for EØS-/EFTA-land', () => {
        expect(countryIsMemberOfEøsOrEfta('swe')).toBe(true);
    });

    it('avviser land utenfor EØS/EFTA', () => {
        expect(countryIsMemberOfEøsOrEfta('USA')).toBe(false);
    });
});

describe('getCountryName', () => {
    it('slår opp landnavn ut fra alpha3-kode', () => {
        expect(getCountryName('SWE', 'nb')).toBe('Sverige');
        expect(getCountryName('SWE', 'nn')).toBe('Sverige');
        expect(getCountryName('SWE', 'en')).toBe('Sweden');
        expect(getCountryName('DEU', 'en_US')).toBe('Germany');
    });

    it('bruker NAV sin egen landkode for Kosovo', () => {
        expect(getCountryName('XXK', 'nb')).toBe('Kosovo');
    });
});

describe('getAlpha3Code', () => {
    it('konverterer alpha2-kode til alpha3-kode', () => {
        expect(getAlpha3Code('SE')).toBe('SWE');
        expect(getAlpha3Code('NO')).toBe('NOR');
        expect(getAlpha3Code('GB')).toBe('GBR');
    });

    it('er ikke avhengig av store/små bokstaver i input', () => {
        expect(getAlpha3Code('se')).toBe('SWE');
    });

    it('bruker NAV sin egen landkode for Kosovo', () => {
        expect(getAlpha3Code('XK')).toBe('XXK');
    });

    it('faller tilbake til input uendret for koder uten alpha3-representasjon', () => {
        expect(getAlpha3Code('UNDEFINED')).toBe('UNDEFINED');
    });
});
