import { isFødselsnummerFormatValid, isSixteenOrOlder } from './fødselsnummer';

describe('<fødselsnummer>', () => {
    it('skal returnere F når fødselsnummer er gyldig', () => {
        const fødselsnummer = '08088620241';
        const erGyldig = isFødselsnummerFormatValid(fødselsnummer);
        expect(erGyldig).toBe('F');
    });

    it('skal returnere false når fødselsnummer er ugyldig', () => {
        const fødselsnummer = '8620241';
        const erGyldig = isFødselsnummerFormatValid(fødselsnummer);
        expect(erGyldig).toBe(false);
    });

    it('skal returnere true når fødselsnummeret tilhører er person over 16 år', () => {
        const fødselsnummer = '08088620241';
        const erSekstenEllerEldre = isSixteenOrOlder(fødselsnummer, 'F');
        expect(erSekstenEllerEldre).toBe(true);
    });

    it('skal returnere false når fødselsnummeret tilhører er person under 16 år', () => {
        const fødselsnummer = '21091981146';
        const erSekstenEllerEldre = isSixteenOrOlder(fødselsnummer, 'F');
        expect(erSekstenEllerEldre).toBe(false);
    });
});
