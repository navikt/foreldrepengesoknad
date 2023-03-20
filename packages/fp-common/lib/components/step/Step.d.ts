import React from 'react';
import { StepIndicatorStep } from '../step-indicator/StepIndicator';
import './step.less';
export interface StepProps {
    pageTitle: string;
    stepTitle: string;
    kompakt: boolean;
    bannerTitle?: string;
    backLinkHref?: string;
    backLinkOnClick?: (href: string, event: React.SyntheticEvent) => void;
    steps: StepIndicatorStep[];
    activeStepId: string;
    previousStepTitle?: string;
    children: React.ReactNode;
    showStepIndicator?: boolean;
    topContentRenderer?: () => React.ReactElement<any>;
    onCancel?: () => void;
    onContinueLater?: () => void;
    cancelOrContinueLaterAriaLabel?: string;
    pageAriaLabel?: string;
    infoMessage?: React.ReactNode;
}
declare const Step: React.FunctionComponent<StepProps>;
export default Step;
