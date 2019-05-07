import Environment from './Environment';

export enum Feature {
    registrertBarn = 'FEATURE_REGISTRERT_BARN',
    hentSakForEndring = 'FEATURE_HENT_SAK_FOR_ENDRING',
    logging = 'FEATURE_LOGGING'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
