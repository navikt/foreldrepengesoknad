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
    it('should return tabulator as invalid char', () => {
        const result = getIllegalChars('\tSome text');
        expect(result).toEqual('\t');
    });
});

