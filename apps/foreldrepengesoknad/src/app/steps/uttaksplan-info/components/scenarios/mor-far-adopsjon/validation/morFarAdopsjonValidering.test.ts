import getIntlMock from 'utils-test/intl-test-helper';
import { validateErAnnenStartdatoAdopsjonGyldig } from './morFarAdopsjonValidering';

describe('morFarAdopsjonValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når annen startdato for adopsjon er på feil format', () => {
        const annenStartdatoAdopsjon = '202-01-01';
        const resultat = validateErAnnenStartdatoAdopsjonGyldig(intlMock)(annenStartdatoAdopsjon!);
        expect(resultat).toBe('Dato for start av perioden må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal ikke feile validering når dato er korrekt', () => {
        const annenStartdatoAdopsjon = '2021-01-01';
        const resultat = validateErAnnenStartdatoAdopsjonGyldig(intlMock)(annenStartdatoAdopsjon!);
        expect(resultat).toBeUndefined();
    });
});
