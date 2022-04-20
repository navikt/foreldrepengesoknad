import getIntlMock from 'utils-test/intl-test-helper';
import { validateStartdatoUttakFarMedmorAleneomsorgFødsel } from './farMedmorAleneomsorgFødselValidation';

describe('farMedmorFødselOgMorHarIkkeRettValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når startdato for uttak ikke er oppgitt', () => {
        const familiehendelsesdato = '2021-01-01';
        const startdatoUttak = undefined;
        const resultat = validateStartdatoUttakFarMedmorAleneomsorgFødsel(
            intlMock,
            familiehendelsesdato
        )(startdatoUttak!);
        expect(resultat).toBe('Du må oppgi dato for start av perioden');
    });

    it('skal feile validering når startdato for uttak er på feil format', () => {
        const familiehendelsesdato = '2021-01-01';
        const startdatoUttak = '202-01-01';
        const resultat = validateStartdatoUttakFarMedmorAleneomsorgFødsel(
            intlMock,
            familiehendelsesdato
        )(startdatoUttak);
        expect(resultat).toBe('Dato for start av perioden må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når startdato for uttak er før familiehendelsesdato', () => {
        const familiehendelsesdato = '2021-01-02';
        const startdatoUttak = '2021-01-01';
        const resultat = validateStartdatoUttakFarMedmorAleneomsorgFødsel(
            intlMock,
            familiehendelsesdato
        )(startdatoUttak);
        expect(resultat).toBe('Perioden må starte på eller etter 02.01.2021');
    });

    it('skal ikke feile validering når dato er korrekt', () => {
        const familiehendelsesdato = '2021-01-01';
        const startdatoUttak = '2021-01-02';
        const resultat = validateStartdatoUttakFarMedmorAleneomsorgFødsel(
            intlMock,
            familiehendelsesdato
        )(startdatoUttak);
        expect(resultat).toBeUndefined();
    });
});
