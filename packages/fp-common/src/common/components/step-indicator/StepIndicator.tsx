// @ts-nocheck
import React from 'react';
import NAVStepIndicator from 'nav-frontend-stegindikator/lib/stegindikator';
import Step from 'nav-frontend-stegindikator/lib/stegindikator-steg';

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

const StepIndicator: React.FunctionComponent<Props> = ({ steps, activeStep, kompakt, visLabel = false }) => {
    return (
        <NAVStepIndicator visLabel={visLabel} autoResponsiv={false} aktivtSteg={activeStep} kompakt={kompakt}>
            {steps.map(({ id, index, label }) => {
                return <Step index={index} label={label} key={id} />;
            })}
        </NAVStepIndicator>
    );
};

export default StepIndicator;
