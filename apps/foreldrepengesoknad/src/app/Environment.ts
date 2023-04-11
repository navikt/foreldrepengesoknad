import FeatureToggle from './FeatureToggle';

const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        REST_API_URL: appSettings.FORELDREPENGESOKNAD_API_URL,
        UTTAK_API_URL: appSettings.FP_UTTAK_SERVICE_URL,
        LOGIN_URL: appSettings.LOGINSERVICE_URL,
        APP_VERSION: appSettings.APP_VERSION,
        FAMILIE: appSettings.FAMILIE,
        [FeatureToggle.visFeilside]: appSettings[FeatureToggle.visFeilside],
        [FeatureToggle.visAlertstripe]: appSettings[FeatureToggle.visAlertstripe],
        [FeatureToggle.visPerioderSomSendesInn]: appSettings[FeatureToggle.visPerioderSomSendesInn],
        [FeatureToggle.wlbGjelderFraFørsteJanuar2022]: appSettings[FeatureToggle.wlbGjelderFraFørsteJanuar2022],
    };
};

export default Environment();
