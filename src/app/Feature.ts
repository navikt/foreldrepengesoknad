import Environment from './Environment';

export enum Feature {
    endringssøknad = 'FEATURE_ENDRINGSSOKNAD'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature] === true) {
        return true;
    }
    return false;
};
