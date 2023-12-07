import FeatureToggle from './FeatureToggle';

const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        REST_API_URL: appSettings.REST_API_URL,
        LOGIN_URL: appSettings.LOGIN_URL,
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
        [FeatureToggle.visFeilside]: appSettings[FeatureToggle.visFeilside],
        [FeatureToggle.visAlertstripe]: appSettings[FeatureToggle.visAlertstripe],
    };
};

export default Environment();
