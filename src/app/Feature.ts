import Environment from './Environment';

export enum Feature {
    mapOpphold = 'FEATURE_MAP_OPPHOLD',
    mapAnnenPartTilInfo = 'FEATURE_MAP_ANNEN_PART_TIL_INFO',
    logging = 'FEATURE_LOGGING',
    visInfoskriv = 'FEATURE_VIS_INFOSKRIV',
    mapFlereArbeidsforhold = 'FEATURE_MAP_FLERE_ARBEIDSFORHOLD'
    /** Nye features må også registreres i ./Environment */
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
