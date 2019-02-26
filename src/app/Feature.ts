import Environment from './Environment';

export enum Feature {
    registrertBarn = 'FEATURE_REGISTRERT_BARN',
    logging = 'FEATURE_LOGGING',
    ferieOgArbeidTilbakeITid = 'FEATURE_FERIE_OG_ARBEID_TILBAKE_I_TID'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
