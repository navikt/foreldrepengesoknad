import FeatureToggle from '../FeatureToggle';
import Environment from '../Environment';

export const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
