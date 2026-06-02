import {
    getIllegalChars,
    hasLegalChars,
    hasMaxLength,
    hasMinLength,
    hasValue,
    isEmpty,
    isNotEqualValue,
    isRequired,
} from './generalFormValidation';

const FEIL = 'feilmelding';

describe('generalFormValidation', () => {
    describe('isEmpty', () => {
        it.each([null, undefined, '', '   '])('er tom for %s', (value) => {
            expect(isEmpty(value)).toBe(true);
        });
        it.each(['x', 0, false, [' ', 'x']])('er ikke tom for %s', (value) => {
            expect(isEmpty(value)).toBe(false);
        });
        it('en liste med kun tomme verdier regnes som tom', () => {
            expect(isEmpty(['', '   ', null])).toBe(true);
        });
    });

    describe('isRequired', () => {
        const validate = isRequired(FEIL);
        it('feiler for tom verdi, godtar utfylt verdi', () => {
            expect(validate('')).toBe(FEIL);
            expect(validate('noe')).toBeNull();
        });
    });

    describe('isNotEqualValue', () => {
        const validate = isNotEqualValue(FEIL, 'forbudt');
        it('feiler når verdiene er like', () => {
            expect(validate('forbudt')).toBe(FEIL);
            expect(validate('annet')).toBeNull();
        });
    });

    describe('hasMinLength / hasMaxLength', () => {
        it('hasMinLength feiler under grensen, godtar tom', () => {
            const validate = hasMinLength(FEIL, 3);
            expect(validate('ab')).toBe(FEIL);
            expect(validate('abc')).toBeNull();
            expect(validate('')).toBeNull();
        });
        it('hasMaxLength feiler over grensen, godtar tom', () => {
            const validate = hasMaxLength(FEIL, 3);
            expect(validate('abcd')).toBe(FEIL);
            expect(validate('abc')).toBeNull();
            expect(validate('')).toBeNull();
        });
    });

    describe('getIllegalChars', () => {
        it('returnerer tom streng når alle tegn er lovlige', () => {
            expect(getIllegalChars('Æøå, 123!')).toBe('');
        });
        it('returnerer unike ulovlige tegn', () => {
            expect(getIllegalChars('abc\u0000\u0000\u0007')).toBe('\u0000\u0007');
        });
    });

    describe('hasLegalChars', () => {
        const validate = hasLegalChars((illegal) => `ulovlig: ${illegal}`);
        it('godtar lovlige tegn', () => {
            expect(validate('Helt vanlig tekst.')).toBeNull();
        });
        it('feiler med ulovlige tegn i feilmeldingen', () => {
            expect(validate('tekst\u0000')).toBe('ulovlig: \u0000');
        });
    });

    describe('hasValue', () => {
        it.each(['x', 0, false])('er sann for %s', (value) => {
            expect(hasValue(value)).toBe(true);
        });
        it.each(['', undefined, null])('er usann for %s', (value) => {
            expect(hasValue(value)).toBe(false);
        });
    });
});
