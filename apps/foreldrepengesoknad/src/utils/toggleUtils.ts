import Environment from '../Environment';
import { FeatureToggle } from '../FeatureToggle';

const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};

export const toggleUtils = {
    isFeatureEnabled,
};
