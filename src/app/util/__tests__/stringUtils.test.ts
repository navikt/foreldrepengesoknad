import { removeSpacesFromString, maxLengthIsGreaterThanOrEqualToStringLength } from '../stringUtils';

describe('stringUtils', () => {
    describe('removeSpacesFromString', () => {
        it('should remove spaces from specified string and return the result', () => {
            expect(removeSpacesFromString('a b c d')).toBe('abcd');
        });
    });

    describe('stringIsNoLongerThan', () => {
        it('should return true if specified maxLength is greater than or equal to string length', () => {
            expect(maxLengthIsGreaterThanOrEqualToStringLength(5, 'abcd')).toBe(true);
            expect(maxLengthIsGreaterThanOrEqualToStringLength(4, 'abcd')).toBe(true);
        });

        it('should return false if specified maxLength is smaller than string length', () => {
            expect(maxLengthIsGreaterThanOrEqualToStringLength(2, 'abcd')).toBe(false);
        });
    });
});
