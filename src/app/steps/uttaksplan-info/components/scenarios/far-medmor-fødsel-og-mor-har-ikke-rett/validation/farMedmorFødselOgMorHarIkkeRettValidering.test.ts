import getIntlMock from 'utils-test/intl-test-helper';
import { validateStartdatoFarMedmor } from './farMedmorFødselOgMorHarIkkeRettValidering';

describe('farMedmorFødselOgMorHarIkkeRettValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når startdato for permisjon er på feil format', () => {
        const permisjonStartdato = '202-01-01';
        const resultat = validateStartdatoFarMedmor(intlMock)(permisjonStartdato!);
        expect(resultat).toBe('Startdato for foreldrepengeperioden må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når startdato for permisjon ikke er på en ukedag', () => {
        const permisjonStartdato = '2021-08-22';
        const resultat = validateStartdatoFarMedmor(intlMock)(permisjonStartdato!);
        expect(resultat).toBe('Du kan ikke starte foreldrepengene på en lørdag eller søndag, du må velge en ukedag');
    });

    it('skal ikke feile validering når dato er korrekt', () => {
        const permisjonStartdato = '2021-01-01';
        const resultat = validateStartdatoFarMedmor(intlMock)(permisjonStartdato!);
        expect(resultat).toBeUndefined();
    });
});
