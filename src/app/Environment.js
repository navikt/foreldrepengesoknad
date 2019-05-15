import { Feature } from './Feature';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [Feature.registrertBarn]: window.appSettings[Feature.registrertBarn],
        [Feature.logging]: window.appSettings[Feature.logging],
        [Feature.hentEksisterendeSak]: window.appSettings[Feature.hentEksisterendeSak],
        [Feature.visAvslåttPeriode]: window.appSettings[Feature.visAvslåttPeriode],
        [Feature.mapOpphold]: window.appSettings[Feature.mapOpphold],
        [Feature.visInfoskriv]: window.appSettings[Feature.visInfoskriv]
    };
};

export default Environment();
