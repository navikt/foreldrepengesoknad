import * as React from 'react';
import { Feature, isFeatureEnabled } from '../../Feature';

export interface Props {
    feature: Feature;
}

const FeatureBlock: React.StatelessComponent<Props> = ({ feature, children }) =>
    isFeatureEnabled(feature) && children ? <>{children}</> : null;

export default FeatureBlock;
