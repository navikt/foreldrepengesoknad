import Environment from './Environment';

export enum Feature {
    registrertBarn = 'FEATURE_REGISTRERT_BARN',
    hentEksisterendeSak = 'FEATURE_HENT_EKSISTERENDE_SAK',
    logging = 'FEATURE_LOGGING',
    visInfoskriv = 'FEATURE_VIS_INFOSKRIV'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
