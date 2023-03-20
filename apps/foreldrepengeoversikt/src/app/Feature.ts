import Environment from './Environment';

export enum Feature {}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if ((Environment as any)[feature] && (Environment as any)[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
