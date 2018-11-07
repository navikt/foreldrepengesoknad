import * as React from 'react';
import { FeatureToggle } from '../../FeatureToggle';
import Environment from '../../Environment';

export interface Props {
    feature: FeatureToggle;
}

const isFeatureEnabled = (feature: FeatureToggle): boolean => {
    if (Environment[feature] && Environment[feature] === true) {
        return true;
    }
    return false;
};

const Feature: React.StatelessComponent<Props> = ({ feature, children }) =>
    isFeatureEnabled(feature) && children ? <>{children}</> : null;

export default Feature;
