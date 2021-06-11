import { validateFødselsnummer } from './validationUtil';
import getIntlMock from 'utils-test/intl-test-helper';

describe('<validationUtil>', () => {
    const intl = getIntlMock();

    it('skal ikke gi feilmelding når søker oppgir gyldige fnr for seg og annen part', () => {
        const søkerFnr = '05030676639';
        const andrePartFnr = '08088620241';

        const resultat = validateFødselsnummer(intl, søkerFnr)(andrePartFnr);

        expect(resultat).toBeUndefined;
    });

    it('skal gi feilmelding når søker oppgir sitt eget fnr som andre parts fnr', () => {
        const søkerFnr = '08088620241';
        const andrePartFnr = '08088620241';

        const resultat = validateFødselsnummer(intl, søkerFnr)(andrePartFnr);

        expect(resultat).toBe('Du kan ikke oppgi ditt eget fødselsnummer');
    });

    it('skal gi feilmelding når andre parts fnr er tom string', () => {
        const søkerFnr = '08088620241';
        const andrePartFnr = '';

        const resultat = validateFødselsnummer(intl, søkerFnr)(andrePartFnr);

        expect(resultat).toBe('Du må skrive et gyldig fødselsnummer');
    });

    it('skal gi feilmelding når annen part er under seksten', () => {
        const søkerFnr = '08088620241';
        const andrePartFnr = '05030676639';

        const resultat = validateFødselsnummer(intl, søkerFnr)(andrePartFnr);

        expect(resultat).toBe('Feil i fødselsnummer. Den andre forelderen må være over seksten år gammel');
    });

    it('skal gi feilmelding når frn er utenlandsk og fnr er tom string', () => {
        const søkerFnr = '08088620241';
        const erUtenlandskFnr = true;
        const andrePartFnr = '';

        const resultat = validateFødselsnummer(intl, søkerFnr, erUtenlandskFnr)(andrePartFnr);

        expect(resultat).toBe('Fødselsnummer må fylles ut');
    });

    it('skal ikke gi feilmelding når frn er utenlandsk og fnr ikke tom string', () => {
        const søkerFnr = '08088620241';
        const erUtenlandskFnr = true;
        const andrePartFnr = '08088620241';

        const resultat = validateFødselsnummer(intl, søkerFnr, erUtenlandskFnr)(andrePartFnr);

        expect(resultat).toBeUndefined;
    });
});
