import { Feature } from './Feature';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [Feature.registrertBarn]: window.appSettings[Feature.registrertBarn]
    };
};

export default Environment();
