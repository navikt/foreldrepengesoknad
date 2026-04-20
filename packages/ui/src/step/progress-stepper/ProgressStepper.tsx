import { useState } from 'react';
import { useIntl } from 'react-intl';

import { FormProgress, Heading, VStack } from '@navikt/ds-react';

export type ProgressStep<TYPE> = {
    id: TYPE;
    label: string;
    isSelected: boolean;
};

interface ProgressStepperProps<TYPE> {
    steps: Array<ProgressStep<TYPE>>;
    onStepChange?: (id: TYPE) => void;
    hideHeader?: boolean;
}

export const ProgressStepper = <TYPE extends string>({
    steps,
    onStepChange,
    hideHeader = false,
}: ProgressStepperProps<TYPE>) => {
    const intl = useIntl();

    const currentStepIndex = steps.findIndex((s) => s.isSelected);
    const [activeStep, setActiveStep] = useState(currentStepIndex + 1);

    if (currentStepIndex === -1) {
        throw new Error('No selected step in step-config');
    }

    return (
        <VStack gap="space-16">
            {!hideHeader && (
                <Heading size="large" level="2">
                    {steps[currentStepIndex]!.label}
                </Heading>
            )}
            <FormProgress
                totalSteps={steps.length}
                activeStep={activeStep}
                onStepChange={(step) => {
                    setActiveStep(step);
                    if (onStepChange) {
                        onStepChange(steps[step - 1]!.id);
                    }
                }}
                interactiveSteps={!!onStepChange}
                translations={{
                    hideAllSteps: intl.formatMessage({ id: 'ProgressStepper.HideSteps' }),
                    showAllSteps: intl.formatMessage({ id: 'ProgressStepper.ShowSteps' }),
                    step: intl.messages['ProgressStepper.StepCounter'] as string,
                }}
            >
                {steps.map((step, index) => (
                    <FormProgress.Step key={step.id} href="#" interactive={onStepChange && index < currentStepIndex}>
                        {step.label}
                    </FormProgress.Step>
                ))}
            </FormProgress>
        </VStack>
    );
};
