import { FeatureToggle } from './FeatureToggle';

const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings');
    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse((settingsNode as HTMLScriptElement).text);

    return {
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
        [FeatureToggle.test1Juli2024Regler]: appSettings[FeatureToggle.test1Juli2024Regler],
    };
};

// eslint-disable-next-line import/no-default-export
export default Environment();
