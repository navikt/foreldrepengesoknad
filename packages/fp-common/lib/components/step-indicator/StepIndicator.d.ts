import React from 'react';
export interface StepIndicatorStep {
    id: string;
    index: number;
    label: string;
}
interface Props {
    activeStep: number;
    steps: StepIndicatorStep[];
    kompakt: boolean;
    visLabel?: boolean;
}
declare const StepIndicator: React.FunctionComponent<Props>;
export default StepIndicator;
