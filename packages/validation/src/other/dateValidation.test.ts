import {
    isDateAAfterDateB,
    isDateASameOrBeforeDateB,
    isDateRangesOverlapping,
    isDateWithinRange,
    isValidDate,
} from './dateValidation';

describe('dateValidation (datouavhengige funksjoner)', () => {
    describe('isValidDate', () => {
        it('godtar gyldig ISO-dato', () => {
            expect(isValidDate('2025-04-01')).toBe(true);
        });
        it.each([undefined, '', '01.04.2025', '2025-13-01', 'ikke-en-dato'])('avviser %s', (value) => {
            expect(isValidDate(value)).toBe(false);
        });
    });

    describe('isDateAAfterDateB', () => {
        it('er sann når A er etter B', () => {
            expect(isDateAAfterDateB('2025-04-02', '2025-04-01')).toBe(true);
        });
        it('er usann når A er lik eller før B', () => {
            expect(isDateAAfterDateB('2025-04-01', '2025-04-01')).toBe(false);
            expect(isDateAAfterDateB('2025-03-31', '2025-04-01')).toBe(false);
        });
    });

    describe('isDateASameOrBeforeDateB', () => {
        it('er sann når A er lik eller før B', () => {
            expect(isDateASameOrBeforeDateB('2025-04-01', '2025-04-01')).toBe(true);
            expect(isDateASameOrBeforeDateB('2025-03-31', '2025-04-01')).toBe(true);
        });
        it('er usann når A er etter B', () => {
            expect(isDateASameOrBeforeDateB('2025-04-02', '2025-04-01')).toBe(false);
        });
    });

    describe('isDateWithinRange', () => {
        it('inkluderer endepunktene', () => {
            expect(isDateWithinRange('2025-04-01', '2025-04-01', '2025-04-30')).toBe(true);
            expect(isDateWithinRange('2025-04-30', '2025-04-01', '2025-04-30')).toBe(true);
        });
        it('er usann utenfor intervallet', () => {
            expect(isDateWithinRange('2025-05-01', '2025-04-01', '2025-04-30')).toBe(false);
        });
    });

    describe('isDateRangesOverlapping', () => {
        it('er usann for tom liste og en enkelt periode', () => {
            expect(isDateRangesOverlapping([])).toBe(false);
            expect(isDateRangesOverlapping([{ from: '2025-04-01', to: '2025-04-10' }])).toBe(false);
        });
        it('er usann for adskilte perioder', () => {
            expect(
                isDateRangesOverlapping([
                    { from: '2025-04-01', to: '2025-04-10' },
                    { from: '2025-04-11', to: '2025-04-20' },
                ]),
            ).toBe(false);
        });
        it('er sann for overlappende perioder', () => {
            expect(
                isDateRangesOverlapping([
                    { from: '2025-04-01', to: '2025-04-15' },
                    { from: '2025-04-10', to: '2025-04-20' },
                ]),
            ).toBe(true);
        });
    });
});
