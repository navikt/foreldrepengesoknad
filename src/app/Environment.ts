import FeatureToggle from './FeatureToggle';

const Environment = () => {
    const appSettings = (window as any).appSettings;
    return {
        REST_API_URL: appSettings.REST_API_URL,
        UTTAK_API_URL: appSettings.UTTAK_API_URL,
        LOGIN_URL: appSettings.LOGIN_URL,
        APP_VERSION: appSettings.APP_VERSION,
        FAMILIE: appSettings.FAMILIE,
        [FeatureToggle.visFeilside]: appSettings[FeatureToggle.visFeilside],
        [FeatureToggle.visAlertstripe]: appSettings[FeatureToggle.visAlertstripe],
        [FeatureToggle.visPerioderSomSendesInn]: appSettings[FeatureToggle.visPerioderSomSendesInn],
    };
};

export default Environment();
