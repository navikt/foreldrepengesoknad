import Environment from './Environment';

export enum FeatureToggle {
    endringssøknad = 'FEATURE_ENDRINGSSOKNAD'
}

export const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature] && Environment[feature] === true) {
        return true;
    }
    return false;
};
