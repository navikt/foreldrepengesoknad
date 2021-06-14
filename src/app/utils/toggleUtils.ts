import FeatureToggle from '../FeatureToggle';
import Environment from '../Environment';

const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};

export default isFeatureEnabled;
