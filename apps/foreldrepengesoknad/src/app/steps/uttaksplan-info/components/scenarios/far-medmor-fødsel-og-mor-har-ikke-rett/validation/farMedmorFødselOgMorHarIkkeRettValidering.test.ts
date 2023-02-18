import getIntlMock from 'utils-test/intl-test-helper';
import { validateStartdatoFarMedmor } from './farMedmorFødselOgMorHarIkkeRettValidering';

describe('farMedmorFødselOgMorHarIkkeRettValidering', () => {
    const intlMock = getIntlMock();
    const minDato = new Date('2021-01-01');
    const maxDato = new Date('2024-01-01');

    it('skal feile validering når startdato for permisjon er på feil format', () => {
        const permisjonStartdato = '202-01-01';
        const resultat = validateStartdatoFarMedmor(intlMock, minDato, maxDato)(permisjonStartdato!);
        expect(resultat).toBe('Startdato for foreldrepengeperioden må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når startdato for permisjon ikke er på en ukedag', () => {
        const permisjonStartdato = '2021-08-22';
        const resultat = validateStartdatoFarMedmor(intlMock, minDato, maxDato)(permisjonStartdato!);
        expect(resultat).toBe('Du kan ikke starte foreldrepengene på en lørdag eller søndag, du må velge en ukedag');
    });

    it('skal ikke feile validering når dato er korrekt', () => {
        const permisjonStartdato = '2021-01-01';
        const resultat = validateStartdatoFarMedmor(intlMock, minDato, maxDato)(permisjonStartdato!);
        expect(resultat).toBeUndefined();
    });
    it('skal feile validering når dato er før mindato', () => {
        const permisjonStartdato = '2020-12-31';
        const resultat = validateStartdatoFarMedmor(intlMock, minDato, maxDato)(permisjonStartdato!);
        expect(resultat).toEqual(
            'Fra og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 01. Jan 2021 til 01. Jan 2024'
        );
    });
    it('skal feile validering når dato er etter maxdato', () => {
        const permisjonStartdato = '2025-01-02';
        const resultat = validateStartdatoFarMedmor(intlMock, minDato, maxDato)(permisjonStartdato!);
        expect(resultat).toEqual(
            'Fra og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 01. Jan 2021 til 01. Jan 2024'
        );
    });
});
