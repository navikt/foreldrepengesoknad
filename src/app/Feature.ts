import Environment from './Environment';

export enum Feature {
    endringssøknad = 'FEATURE_ENDRINGSSOKNAD',
    nynorsk = 'FEATURE_NYNORSK',
    registrertBarn = 'FEATURE_REGISTRERT_BARN'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
