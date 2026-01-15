import { Environment } from '@navikt/fp-constants';

import { FeatureToggle } from '../FeatureToggle';

const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature]?.toLowerCase() === 'on') {
        return true;
    }
    return false;
};

export const toggleUtils = {
    isFeatureEnabled,
};
