import { dateIsSameOrAfter, dateIsSameOrBefore } from './dateUtils';

describe('dateUtils', () => {
    it('skal returnere true når dato er før annen dato', () => {
        const erDatoFørAnnenDato = dateIsSameOrBefore('2021-01-01', '2021-01-02');
        expect(erDatoFørAnnenDato).toBe(true);
    });

    it('skal returnere true når dato er etter annen dato', () => {
        const erDatoEtterAnnenDato = dateIsSameOrAfter('2021-01-02', '2021-01-01');
        expect(erDatoEtterAnnenDato).toBe(true);
    });
});
