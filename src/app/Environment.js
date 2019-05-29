import { Feature } from './Feature';

const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [Feature.logging]: window.appSettings[Feature.logging],
        [Feature.visAvslåttPeriode]: window.appSettings[Feature.visAvslåttPeriode],
        [Feature.mapOpphold]: window.appSettings[Feature.mapOpphold],
        [Feature.visInfoskriv]: window.appSettings[Feature.visInfoskriv],
        [Feature.mapAnnenPartTilInfo]: window.appSettings[Feature.mapAnnenPartTilInfo],
        [Feature.mapFlereArbeidsforhold]: window.appSettings[Feature.mapFlereArbeidsforhold]
    };
};

export default Environment();
