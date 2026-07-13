import { assertUnreachable, containsWhiteSpace, notEmpty } from './validation';

describe('validation', () => {
    describe('notEmpty', () => {
        it('returnerer verdien når den er definert', () => {
            expect(notEmpty('verdi')).toBe('verdi');
            expect(notEmpty(0)).toBe(0);
            expect(notEmpty(false)).toBe(false);
        });
        it('kaster for null og undefined', () => {
            expect(() => notEmpty(null)).toThrow('Data er ikke oppgitt');
            expect(() => notEmpty(undefined)).toThrow('Data er ikke oppgitt');
        });
        it('bruker egendefinert feilmelding', () => {
            expect(() => notEmpty(null, 'mangler barn')).toThrow('mangler barn');
        });
    });

    describe('assertUnreachable', () => {
        it('kaster alltid', () => {
            expect(() => assertUnreachable()).toThrow('This should never happen.');
            expect(() => assertUnreachable('egendefinert')).toThrow('egendefinert');
        });
    });

    describe('containsWhiteSpace', () => {
        it('er sann når strengen inneholder mellomrom', () => {
            expect(containsWhiteSpace('a b')).toBe(true);
            expect(containsWhiteSpace('a\tb')).toBe(true);
        });
        it('er usann uten mellomrom', () => {
            expect(containsWhiteSpace('abc')).toBe(false);
        });
    });
});
