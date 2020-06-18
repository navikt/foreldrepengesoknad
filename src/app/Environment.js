import { Feature } from './Feature';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        APP_VERSION: window.appSettings.APP_VERSION,
        [Feature.visFeilside]: window.appSettings[Feature.visFeilside],
        [Feature.visAlertstripe]: window.appSettings[Feature.visAlertstripe],
        [Feature.logging]: window.appSettings[Feature.logging],
        [Feature.visPerioderSomSendesInn]: window.appSettings[Feature.visPerioderSomSendesInn],
    };
};

export default Environment();
