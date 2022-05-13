import fns from './toggleUtils';
import FeatureToggle from '../FeatureToggle';

// TODO Denne er ikkje bra. Er avhengig av å setta verdiar i setup-fila til Jest.

describe('<isFeatureEnabled>', () => {
    it('skal ha feature toggle som er på', () => {
        const erTogglePå = fns.isFeatureEnabled(FeatureToggle.visAlertstripe);
        expect(erTogglePå).toBe(true);
    });

    it('skal ha feature toggle som er av', () => {
        const erTogglePå = fns.isFeatureEnabled(FeatureToggle.visFeilside);
        expect(erTogglePå).toBe(false);
    });
});
