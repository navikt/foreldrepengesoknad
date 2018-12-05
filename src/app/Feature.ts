import Environment from './Environment';

export enum Feature {
    endringssøknad = 'FEATURE_ENDRINGSSOKNAD',
    nynorsk = 'FEATURE_NYNORSK',
    hentUttaksplanForEndring = 'FEATURE_ENDRING_UTTAKSPLAN'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
