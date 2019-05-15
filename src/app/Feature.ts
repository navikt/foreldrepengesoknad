import Environment from './Environment';

export enum Feature {
    registrertBarn = 'FEATURE_REGISTRERT_BARN',
    hentEksisterendeSak = 'FEATURE_HENT_EKSISTERENDE_SAK',
    visAvslåttPeriode = 'FEATURE_VIS_AVSLATT_PERIODE',
    mapOpphold = 'FEATURE_MAP_OPPHOLD',
    logging = 'FEATURE_LOGGING',
    visInfoskriv = 'FEATURE_VIS_INFOSKRIV'
    /** Nye features må også registreres i ./Environment */
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
