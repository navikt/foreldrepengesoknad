import FeatureToggle from './FeatureToggle';

const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
        [FeatureToggle.test1Juli2024Regler]: appSettings[FeatureToggle.test1Juli2024Regler],
    };
};

export default Environment();
