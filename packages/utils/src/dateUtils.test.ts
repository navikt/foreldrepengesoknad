import { dateIsSameOrAfter, dateIsSameOrBefore, erFødtFørUke33 } from './dateUtils';

describe('dateUtils', () => {
    describe('erFødtFørUke33', () => {
        it('skal returnere true når barnet er født mer enn 49 dager før termin', () => {
            expect(erFødtFørUke33('2021-01-01', '2021-03-01')).toBe(true);
        });

        it('skal returnere false når barnet er født nøyaktig 49 dager før termin', () => {
            expect(erFødtFørUke33('2021-01-11', '2021-03-01')).toBe(false);
        });

        it('skal returnere false når fødselsdato eller termindato mangler', () => {
            expect(erFødtFørUke33(undefined, '2021-03-01')).toBe(false);
            expect(erFødtFørUke33('2021-01-01', undefined)).toBe(false);
        });

        it('skal returnere false når datoene er ugyldige', () => {
            expect(erFødtFørUke33('ikke-dato', '2021-03-01')).toBe(false);
            expect(erFødtFørUke33('2021-01-01', 'ikke-dato')).toBe(false);
        });
    });

    it('skal returnere true når dato er før annen dato', () => {
        const erDatoFørAnnenDato = dateIsSameOrBefore('2021-01-01', '2021-01-02');
        expect(erDatoFørAnnenDato).toBe(true);
    });

    it('skal returnere true når dato er etter annen dato', () => {
        const erDatoEtterAnnenDato = dateIsSameOrAfter('2021-01-02', '2021-01-01');
        expect(erDatoEtterAnnenDato).toBe(true);
    });
});
