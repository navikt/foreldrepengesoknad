import { getIllegalChars } from 'app/validation/fieldValidations';

describe('getIllegalChars', () => {
    it('should return true for valids tring', () => {
        const result = getIllegalChars('abcd89217åæø');
        expect(result).toEqual('');
    });
    it('should return invalid chars for invalid string', () => {
        const result = getIllegalChars('¤Special !@#%^&*()`~');
        expect(result).toEqual('¤#^*`~');
    });
    it('should return \u2f8a (glyphen) as invalid char', () => {
        const result = getIllegalChars('\u2f8aSome text');
        expect(result).toEqual('\u2f8a');
    });
    it('should return \uFFFD (replacement char) as invalid char', () => {
        const result = getIllegalChars(
            'Albert Åberg og/å Prøysen beholder sine nordiske tegn, mens replacement character \uFFFDer ikke lov'
        );
        expect(result).toEqual('\uFFFD');
    });
    it('should return empty string if all input is valid', () => {
        const result = getIllegalChars('Lovlig input.');
        expect(result).toEqual('');
    });
});
