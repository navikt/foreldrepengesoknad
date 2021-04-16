import fns from '../visibility';

describe('Næringsrelasjon-bolk visibility', () => {
    describe('tlfnrVisible', () => {
        it('should be visible if navn is not undefined', () => {
            expect(fns.tlfnr({ navn: 'testnavn' })).toBe(true);
        });

        it('should be hidden if navn is undefined', () => {
            expect(fns.tlfnr({})).toBe(false);
        });
    });

    describe('erNærVennEllerFamilieVisible', () => {
        it('should be visible if telefonnummer is not undefined and tlfnrVisible evalutes to true', () => {
            fns.tlfnr = jest.fn(() => true);
            expect(fns.erNærVennEllerFamilie({ telefonnummer: '12345678' })).toBe(true);
        });

        it('should be hidden if telefonnummer is undefined', () => {
            expect(fns.erNærVennEllerFamilie({})).toBe(false);
        });

        it('should be hidden if tlfnrVisible evaluates to false', () => {
            fns.tlfnr = jest.fn(() => false);
            expect(fns.erNærVennEllerFamilie({ telefonnummer: '12345678' })).toBe(false);
        });
    });
});
