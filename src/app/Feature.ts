import Environment from './Environment';

export enum Feature {
    visPerioderSomSendesInn = 'FEATURE_VIS_PERIODER_SOM_SENDES_INN',
    visFeilside = 'FEATURE_VIS_FEILSIDE',
    visAlertstripe = 'FEATURE_VIS_ALERTSTRIPE'
    /** Nye features må også registreres i ./Environment */
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
