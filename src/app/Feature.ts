import Environment from './Environment';

export enum Feature {
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
