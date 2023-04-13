import { BodyShort, Heading, Stepper } from '@navikt/ds-react';
import Step, { StepperStepProps } from '@navikt/ds-react/esm/stepper/Step';
import React, { useEffect, useRef, useState } from 'react';
import { Back, Collapse, Expand } from '@navikt/ds-icons';
import { guid } from './../../utils/guid';
import './progress-stepper.css';

export interface ProgressStep extends Pick<StepperStepProps, 'completed'> {
    id: string;
    index: number;
    label: string;
    href?: string;
}

interface Labels {
    showAllStepsLabel?: string;
    goToPreviousStepLabel: string;
    allStepsSectionAriaLabel?: string;
    navigasjonAriaLabel?: string;
    stepProgressLabelFunc: (currentStep: number, totalSteps: number) => string;
}

const defaultLabels: Labels = {
    showAllStepsLabel: 'Vis alle steg',
    goToPreviousStepLabel: 'Gå til forrige steg',
    allStepsSectionAriaLabel: 'Alle steg',
    navigasjonAriaLabel: 'Navigasjon i søknaden',
    stepProgressLabelFunc: (currentStep, totalSteps) => `Steg ${currentStep} av ${totalSteps}`,
};

export interface ProgressStepperProps {
    steps: ProgressStep[];
    currentStepIndex: number;
    labels?: Labels;
    titleHeadingLevel?: '1' | '2';
    allStepsHeader?: React.ReactNode;
    allStepsFooter?: React.ReactNode;
    includeBackLink?: boolean;
    setFocusOnHeadingOnMount?: boolean;
    onStepSelect?: (step: ProgressStep) => void;
}

const ProgressStepper: React.FunctionComponent<ProgressStepperProps> = ({
    steps,
    currentStepIndex,
    allStepsHeader,
    allStepsFooter,
    labels = defaultLabels,
    titleHeadingLevel = '1',
    includeBackLink = false,
    setFocusOnHeadingOnMount = true,
    onStepSelect,
}) => {
    const [allStepsVisible, setAllStepsVisible] = useState(false);

    const step = steps[currentStepIndex];
    const currentStepNumber = currentStepIndex + 1;
    const totalSteps = steps.length;
    const progress = (100 / totalSteps) * currentStepNumber;
    const contentContainerID = guid();

    const handleStepChange = (idx: number) => {
        if (onStepSelect) {
            onStepSelect(steps[idx - 1]);
        }
    };

    const handleBackClick = () => {
        if (onStepSelect) {
            onStepSelect(steps[currentStepIndex - 1]);
        }
    };

    const currentStepInfo = (
        <BodyShort as="div">{labels.stepProgressLabelFunc(currentStepNumber, totalSteps)}</BodyShort>
    );
    const includeGotoPreviousStepLink = onStepSelect !== undefined && includeBackLink === true;
    const currentStepInfoInHeader = includeGotoPreviousStepLink ? (
        <div className="progressStepper__heading__stepInfo">{currentStepInfo}</div>
    ) : undefined;

    const headingRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (setFocusOnHeadingOnMount && headingRef.current) {
            headingRef.current.focus();
        }
    }, [setFocusOnHeadingOnMount]);

    return (
        <div className="progressStepper">
            <div className="progressStepper__heading">
                <Heading
                    tabIndex={-1}
                    size="xlarge"
                    level={titleHeadingLevel}
                    className="progressStepper__heading__title"
                    ref={headingRef}
                >
                    {currentStepInfoInHeader}
                    {step.label}
                </Heading>
            </div>
            <div className="progressStepper__progressBarWrapper" role="presentation" aria-hidden={true}>
                <div className="progressStepper__progressBar">
                    <div className="progressStepper__progressBar__progress" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <nav aria-label={labels.navigasjonAriaLabel}>
                <div className="progressStepper__stepsInfo">
                    {includeGotoPreviousStepLink ? (
                        <BodyShort>
                            {currentStepIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBackClick}
                                    className="navds-read-more__button navds-body-short progressStepper__backLink"
                                >
                                    <Back className="progressStepper__backLink__icon" aria-hidden />
                                    {labels.goToPreviousStepLabel}
                                </button>
                            )}
                        </BodyShort>
                    ) : (
                        <>{currentStepInfo}</>
                    )}
                    <button
                        type="button"
                        className="navds-read-more__button navds-body-short"
                        aria-controls={contentContainerID}
                        aria-expanded={allStepsVisible}
                        onClick={() => {
                            setAllStepsVisible(!allStepsVisible);
                        }}
                    >
                        {allStepsVisible === false && (
                            <Expand className="progressStepper__toggleAllStepsIcon" aria-hidden />
                        )}
                        {allStepsVisible && <Collapse className="progressStepper__toggleAllStepsIcon" aria-hidden />}
                        {labels.showAllStepsLabel}
                    </button>
                </div>
                <div id={contentContainerID} aria-hidden={allStepsVisible === false} aria-live="polite">
                    {allStepsVisible && (
                        <section className="progressStepper__allSteps" aria-label={labels.allStepsSectionAriaLabel}>
                            {allStepsHeader && (
                                <BodyShort as="div" className="progressStepper__allSteps__header">
                                    {allStepsHeader}
                                </BodyShort>
                            )}
                            <Stepper
                                activeStep={currentStepNumber}
                                onStepChange={onStepSelect ? handleStepChange : undefined}
                            >
                                {steps.map((s) => (
                                    <Step
                                        key={s.id}
                                        completed={s.completed}
                                        interactive={onStepSelect !== undefined && s.completed === true}
                                    >
                                        {s.label}
                                    </Step>
                                ))}
                            </Stepper>
                            {allStepsFooter && (
                                <BodyShort as="div" className="progressStepper__allSteps__footer">
                                    {allStepsFooter}
                                </BodyShort>
                            )}
                        </section>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default ProgressStepper;
