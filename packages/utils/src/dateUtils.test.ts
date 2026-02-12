import { dateIsSameOrAfter, dateIsSameOrBefore, erUnder25År } from './dateUtils';

describe('dateUtils', () => {
    it('skal returnere true når dato er før annen dato', () => {
        const erDatoFørAnnenDato = dateIsSameOrBefore(new Date('2021-01-01'), new Date('2021-01-02'));
        expect(erDatoFørAnnenDato).toBe(true);
    });

    it('skal returnere true når dato er etter annen dato', () => {
        const erDatoEtterAnnenDato = dateIsSameOrAfter(new Date('2021-01-02'), new Date('2021-01-01'));
        expect(erDatoEtterAnnenDato).toBe(true);
    });

    it('skal returnere true når person er under 25 år', () => {
        expect(erUnder25År('2010-01-01')).toBe(true);
    });

    it('skal returnere false når person er 25 år eller eldre', () => {
        expect(erUnder25År('1999-01-01')).toBe(false);
    });

    it('skal returnere false når person er over 25 år', () => {
        expect(erUnder25År('1990-01-01')).toBe(false);
    });
});
