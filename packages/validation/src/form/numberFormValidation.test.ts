import { formatValue, hasMaxValue, hasMinValue, isValidDecimal, isValidInteger, isValidNumberForm } from './numberFormValidation';

const FEIL = 'feilmelding';

describe('numberFormValidation', () => {
    describe('isValidNumberForm', () => {
        const validate = isValidNumberForm(FEIL);
        it('returnerer null for tom verdi og gyldige tall', () => {
            expect(validate('')).toBeNull();
            expect(validate('42')).toBeNull();
            expect(validate('3,5')).toBeNull();
        });
        it('returnerer feilmelding for ugyldig tall', () => {
            expect(validate('abc')).toBe(FEIL);
        });
    });

    describe('isValidInteger', () => {
        const validate = isValidInteger(FEIL);
        it('godtar heltall og tom verdi', () => {
            expect(validate('5')).toBeNull();
            expect(validate('  10  ')).toBeNull();
            expect(validate('')).toBeNull();
        });
        it('avviser desimaltall', () => {
            expect(validate('5.5')).toBe(FEIL);
        });
    });

    describe('isValidDecimal', () => {
        const validate = isValidDecimal(FEIL);
        it('godtar heltall og inntil to desimaler', () => {
            expect(validate('5')).toBeNull();
            expect(validate('5.5')).toBeNull();
            expect(validate('5.55')).toBeNull();
        });
        it('avviser mer enn to desimaler', () => {
            expect(validate('5.555')).toBe(FEIL);
        });
    });

    describe('hasMinValue', () => {
        const validate = hasMinValue(FEIL, 10);
        it('godtar verdi lik eller over grensen (tall og streng)', () => {
            expect(validate(10)).toBeNull();
            expect(validate('15')).toBeNull();
        });
        it('avviser verdi under grensen', () => {
            expect(validate(9)).toBe(FEIL);
        });
    });

    describe('hasMaxValue', () => {
        const validate = hasMaxValue(FEIL, 10);
        it('godtar verdi lik eller under grensen', () => {
            expect(validate(10)).toBeNull();
            expect(validate(5)).toBeNull();
        });
        it('avviser verdi over grensen', () => {
            expect(validate(11)).toBe(FEIL);
        });
    });

    describe('formatValue', () => {
        it('konverterer komma til punktum og returnerer tall', () => {
            expect(formatValue('3,5')).toBe(3.5);
            expect(formatValue('42')).toBe(42);
        });
        it('returnerer undefined for tom streng', () => {
            expect(formatValue('')).toBeUndefined();
        });
    });
});
