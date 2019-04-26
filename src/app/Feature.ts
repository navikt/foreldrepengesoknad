import Environment from './Environment';

export enum Feature {
    registrertBarn = 'FEATURE_REGISTRERT_BARN',
    visMorsUttaksplanForVarMedmor = 'FEATURE_VIS_MORS_UTTAKSPLAN_FOR_FARMEDMOR',
    logging = 'FEATURE_LOGGING'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
