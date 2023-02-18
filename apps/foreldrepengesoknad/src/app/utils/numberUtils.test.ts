import { erGyldigNorskOrgnummer, getFloatFromString } from './numberUtils';

describe('numberUtils', () => {
    it('skal returnere false om orgnr har 9 tall', () => {
        const verdi = erGyldigNorskOrgnummer('100000000');
        expect(verdi).toBe(false);
    });

    it('skal returnere false om orgnr starter på 8', () => {
        const verdi = erGyldigNorskOrgnummer('800000');
        expect(verdi).toBe(false);
    });

    it('skal returnere false om orgnr starter på 9', () => {
        const verdi = erGyldigNorskOrgnummer('900000');
        expect(verdi).toBe(false);
    });

    it('skal returnere false om orgnr er 999999999', () => {
        const verdi = erGyldigNorskOrgnummer('999999999');
        expect(verdi).toBe(false);
    });

    it('skal returnere true når orgnr er gyldig', () => {
        const verdi = erGyldigNorskOrgnummer('997519485');
        expect(verdi).toBe(true);
    });

    it('skal returnere float fra streng', () => {
        const verdi = getFloatFromString('12.23');
        expect(verdi).toBe(12.23);
    });

    it('skal returnere undefined når streng inneholder flere punktum', () => {
        const verdi = getFloatFromString('12.2.3');
        expect(verdi).toBeUndefined();
    });
});
