import FeatureToggle from '../FeatureToggle';
import { isFeatureEnabled } from './toggleUtils';

describe('<isFeatureEnabled>', () => {
    it('skal ha feature toggle som er på', () => {
        const erTogglePå = isFeatureEnabled(FeatureToggle.visAlertstripe);
        expect(erTogglePå).toBe(true);
    });

    it('skal ha feature toggle som er av', () => {
        const erTogglePå = isFeatureEnabled(FeatureToggle.visFeilside);
        expect(erTogglePå).toBe(false);
    });
});
