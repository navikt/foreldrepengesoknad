import { FeatureToggle } from './FeatureToggles';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [FeatureToggle.endringssøknad]: window.appSettings.FEATURE_ENDRINGSSOKNAD
    };
};

export default Environment();
