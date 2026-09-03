import { Environment } from '@navikt/fp-constants';

import { FeatureToggle } from '../FeatureToggle';

const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    return Environment[feature]?.toLowerCase() === 'on';
};

export const toggleUtils = {
    isFeatureEnabled,
};
