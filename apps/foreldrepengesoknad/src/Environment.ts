import FeatureToggle from './FeatureToggle';

const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings');
    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse((settingsNode as HTMLScriptElement).text);

    return {
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
        PUBLIC_PATH: appSettings.PUBLIC_PATH,
        [FeatureToggle.test1Juli2024Regler]: appSettings[FeatureToggle.test1Juli2024Regler],
    };
};

export default Environment();
