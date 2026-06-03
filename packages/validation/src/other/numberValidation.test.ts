import { isValidNumber } from './numberValidation';

describe('isValidNumber', () => {
    it.each(['0', '42', '1000', '3,5', '3.5', 12, 0])('godtar gyldig tall %s', (value) => {
        expect(isValidNumber(value)).toBe(true);
    });

    it.each(['', ' ', 'abc', '1,', '1.', '1,2,3', '-5', '1 000'])('avviser ugyldig tall %s', (value) => {
        expect(isValidNumber(value)).toBe(false);
    });
});
