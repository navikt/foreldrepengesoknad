import FeatureToggle from '../FeatureToggle';
import fns from './toggleUtils';

describe('<isFeatureEnabled>', () => {
    it('skal ha feature toggle som er på', () => {
        const erTogglePå = fns.isFeatureEnabled(FeatureToggle.visFeilside);
        expect(erTogglePå).toBe(true);
    });

    it('skal ha feature toggle som er av', () => {
        const erTogglePå = fns.isFeatureEnabled(FeatureToggle.visAlertstripe);
        expect(erTogglePå).toBe(false);
    });
});
