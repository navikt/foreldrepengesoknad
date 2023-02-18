import getIntlMock from 'utils-test/intl-test-helper';
import { validateFrilansoppstartsDato } from './inntektsinformasjonValidering';

describe('inntektsinformasjonValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når oppstartsdato ikke er oppgitt', () => {
        const oppstartsdato = undefined;

        const resultat = validateFrilansoppstartsDato(intlMock)(oppstartsdato!);

        expect(resultat).toBe('Du må oppgi oppstartsdato for når du startet som frilans');
    });

    it('skal feile validering når oppstartsdato ikke er gyldig', () => {
        const oppstartsdato = '202-01-01';

        const resultat = validateFrilansoppstartsDato(intlMock)(oppstartsdato!);

        expect(resultat).toBe(
            'Oppstartsdato for når du startet som frilans må være en gyldig dato på formatet dd.mm.åååå'
        );
    });

    it('skal ikke feile validering av oppstartsdato', () => {
        const oppstartsdato = '2021-01-01';

        const resultat = validateFrilansoppstartsDato(intlMock)(oppstartsdato!);

        expect(resultat).toBeUndefined();
    });
});
