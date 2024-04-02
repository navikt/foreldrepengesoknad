import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, Heading, Stepper } from '@navikt/ds-react';

import './progressStepper.css';

export type ProgressStep<TYPE> = {
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
};

export interface ProgressStepperProps<TYPE> {
    steps: Array<ProgressStep<TYPE>>;
    onStepSelect?: (step: ProgressStep<TYPE>) => void;
}

const ProgressStepper = <TYPE extends string>({ steps, onStepSelect }: ProgressStepperProps<TYPE>) => {
    const intl = useIntl();
    const [allStepsVisible, setAllStepsVisible] = useState(false);

    const currentStepIndex = steps.findIndex((s) => s.isSelected);
    if (currentStepIndex === -1) {
        throw new Error('No selected step in step-config');
    }

    const step = steps[currentStepIndex];
    const currentStepNumber = currentStepIndex + 1;
    const totalSteps = steps.length;
    const progress = (100 / totalSteps) * currentStepNumber;
    const contentContainerID = 'progress-stepper-container-id';

    const handleStepChange = (idx: number) => {
        if (onStepSelect) {
            onStepSelect(steps[idx - 1]);
        }
    };

    const currentStepInfo = (
        <BodyShort as="div">
            {intl.formatMessage(
                { id: 'ProgressStepper.StepProgressLabel' },
                { currentStep: currentStepNumber, totalSteps: totalSteps },
            )}
        </BodyShort>
    );

    const headingRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (headingRef.current) {
            headingRef.current.focus();
        }
    }, []);

    return (
        <div className="progressStepper">
            <div className="progressStepper__heading">
                <Heading
                    tabIndex={-1}
                    size="medium"
                    level="2"
                    className="progressStepper__heading__title"
                    ref={headingRef}
                >
                    {step.label}
                </Heading>
            </div>
            <div className="progressStepper__progressBarWrapper" role="presentation" aria-hidden={true}>
                <div className="progressStepper__progressBar">
                    <div className="progressStepper__progressBar__progress" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <nav aria-label={intl.formatMessage({ id: 'ProgressStepper.NavigasjonAriaLabel' })}>
                <div className="progressStepper__stepsInfo">
                    {currentStepInfo}
                    <button
                        type="button"
                        className="navds-read-more__button navds-body-short"
                        aria-controls={contentContainerID}
                        aria-expanded={allStepsVisible}
                        aria-label={allStepsVisible ? 'Skjul stegene' : 'Se alle steg'}
                        onClick={() => {
                            setAllStepsVisible(!allStepsVisible);
                        }}
                    >
                        {allStepsVisible === false && (
                            <ChevronDownIcon className="progressStepper__toggleAllStepsIcon" aria-hidden />
                        )}
                        {allStepsVisible && (
                            <ChevronUpIcon className="progressStepper__toggleAllStepsIcon" aria-hidden />
                        )}
                    </button>
                </div>
                <div id={contentContainerID} aria-hidden={allStepsVisible === false} aria-live="polite">
                    {allStepsVisible && (
                        <section
                            className="progressStepper__allSteps"
                            aria-label={intl.formatMessage({ id: 'ProgressStepper.AllStepsSectionAriaLabel' })}
                        >
                            <Stepper
                                activeStep={currentStepNumber}
                                onStepChange={onStepSelect ? handleStepChange : undefined}
                            >
                                {steps.map((s) => (
                                    <Stepper.Step
                                        key={s.id}
                                        completed={s.completed}
                                        interactive={onStepSelect !== undefined && s.completed === true}
                                    >
                                        {s.label}
                                    </Stepper.Step>
                                ))}
                            </Stepper>
                        </section>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default ProgressStepper;
