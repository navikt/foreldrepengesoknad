import getIntlMock from 'utils-test/intl-test-helper';
import { validateHarGodkjentOppsummering } from './oppsummeringValidation';

describe('oppsummeringValidation', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når en ikke har godkjent oppsummeringen', () => {
        const harGodkjent = false;
        const resultat = validateHarGodkjentOppsummering(intlMock)(harGodkjent);
        expect(resultat).toBe('Du må bekrefte at du har gjort deg kjent med vilkårene.');
    });

    it('skal ikke feile validering når en har godkjent oppsummeringen', () => {
        const harGodkjent = true;
        const resultat = validateHarGodkjentOppsummering(intlMock)(harGodkjent);
        expect(resultat).toBeUndefined();
    });
});
