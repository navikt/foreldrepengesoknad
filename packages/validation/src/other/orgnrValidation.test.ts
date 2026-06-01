import { erGyldigNorskOrgnummer } from './orgnrValidation';

describe('erGyldigNorskOrgnummer', () => {
    it.each(['889640782', '991078045', '992260475', '992257822'])('godtar gyldig orgnummer %s', (orgnr) => {
        expect(erGyldigNorskOrgnummer(orgnr)).toBe(true);
    });

    it('avviser orgnummer med feil kontrollsiffer', () => {
        expect(erGyldigNorskOrgnummer('889640783')).toBe(false);
    });

    it('avviser nummer som ikke starter på 8 eller 9', () => {
        expect(erGyldigNorskOrgnummer('123456785')).toBe(false);
    });

    it('avviser nummer med feil lengde', () => {
        expect(erGyldigNorskOrgnummer('99107804')).toBe(false);
        expect(erGyldigNorskOrgnummer('9910780455')).toBe(false);
    });

    it('avviser ikke-numeriske verdier', () => {
        expect(erGyldigNorskOrgnummer('99107804a')).toBe(false);
    });

    it('avviser tom streng og dummyverdien 999999999', () => {
        expect(erGyldigNorskOrgnummer('')).toBe(false);
        expect(erGyldigNorskOrgnummer('999999999')).toBe(false);
    });
});
