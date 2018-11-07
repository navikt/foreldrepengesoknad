import * as React from 'react';
import { FeatureToggle, isFeatureEnabled } from '../../FeatureToggle';

export interface Props {
    feature: FeatureToggle;
}

const FeatureBlock: React.StatelessComponent<Props> = ({ feature, children }) =>
    isFeatureEnabled(feature) && children ? <>{children}</> : null;

export default FeatureBlock;
