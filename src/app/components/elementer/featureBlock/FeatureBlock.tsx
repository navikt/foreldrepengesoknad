import * as React from 'react';
import { Feature, isFeatureEnabled } from '../../../Feature';

export interface Props {
    feature: Feature;
    render: () => JSX.Element;
}

const FeatureBlock: React.FunctionComponent<Props> = ({ feature, render }) =>
    isFeatureEnabled(feature) ? render() : null;

export default FeatureBlock;
