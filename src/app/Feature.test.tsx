import { isFeatureEnabled, Feature } from './Feature';

describe('<isFeatureEnabled>', () => {
    let originalAppSettings: any;
    beforeAll(() => {
        originalAppSettings = (window as any).appSettings;
        const nyeAppSettings = {
            [Feature.visFeilside]: 'off',
            [Feature.visAlertstripe]: 'on',
        };
        (window as any).appSettings = nyeAppSettings;
    });

    afterAll(() => {
        (window as any).appSettings = originalAppSettings;
    });

    it('skal ha feature toggle som er på', () => {
        const erTogglePå = isFeatureEnabled(Feature.visAlertstripe);
        expect(erTogglePå).toBe(true);
    });

    it('skal ha feature toggle som er av', () => {
        const erTogglePå = isFeatureEnabled(Feature.visFeilside);
        expect(erTogglePå).toBe(false);
    });
});
