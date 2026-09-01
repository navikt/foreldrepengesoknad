import { describe, expect, it } from 'vitest';

import { getAlpha3Code } from './countryUtils';

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
