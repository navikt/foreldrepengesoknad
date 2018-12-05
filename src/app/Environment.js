import { Feature } from './Feature';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [Feature.endringssøknad]: window.appSettings[Feature.endringssøknad],
        [Feature.nynorsk]: window.appSettings[Feature.nynorsk],
        [Feature.hentUttaksplanForEndring]: window.appSettings[Feature.hentUttaksplanForEndring]
    };
};

export default Environment();
