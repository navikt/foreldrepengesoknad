import React from 'react';
import bemUtils from './../../utils/bemUtils';
import Page from './Page';
import { StepIndicatorStep } from '../step-indicator/StepIndicator';
import StepBanner from '../step-banner/StepBanner';
import Block from '../block/Block';
import StepFooter from '../step-footer/StepFooter';
import ProgressStepper from '../progress-stepper/ProgressStepper';

import './step.less';

export interface StepProps {
    pageTitle?: string;
    bannerTitle?: string;
    steps: StepIndicatorStep[];
    activeStepId?: string;
    children: React.ReactNode;
    showStepIndicator?: boolean;
    topContentRenderer?: () => React.ReactElement<any>;
    onCancel?: () => void;
    onContinueLater?: () => void;
    cancelOrContinueLaterAriaLabel?: string;
    pageAriaLabel?: string;
    infoMessage?: React.ReactNode;
    useNoTempSavingText?: boolean;
}

const Step: React.FunctionComponent<StepProps> = ({
    bannerTitle,
    pageTitle,
    steps,
    activeStepId,
    onCancel,
    onContinueLater,
    cancelOrContinueLaterAriaLabel,
    showStepIndicator = true,
    children,
    pageAriaLabel,
    infoMessage,
    useNoTempSavingText,
}) => {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStepId || s.isSelected);

    const title = pageTitle || steps[currentStepIndex].label;

    const bem = bemUtils('step');
    return (
        <Page
            className={bem.block}
            title={title}
            ariaLabel={pageAriaLabel}
            topContentRenderer={() => (
                <>
                    {bannerTitle && (
                        <>
                            <StepBanner text={bannerTitle} />
                        </>
                    )}
                </>
            )}
        >
            {infoMessage !== undefined && <div className={bem.element('infoMessage')}>{infoMessage}</div>}
            {showStepIndicator && (
                <Block padBottom="xxl">
                    <div role="presentation" aria-hidden={true}>
                        <ProgressStepper
                            steps={steps}
                            currentStepIndex={currentStepIndex}
                            titleHeadingLevel="2"
                        ></ProgressStepper>
                    </div>
                </Block>
            )}
            <section aria-label={`Steg ${currentStepIndex + 1} av ${steps.length}:  ${title}`}>
                <Block>{children}</Block>

                {(onCancel || onContinueLater) && (
                    <div
                        role={cancelOrContinueLaterAriaLabel ? 'complementary' : undefined}
                        aria-label={cancelOrContinueLaterAriaLabel}
                    >
                        <StepFooter
                            onAvbrytOgSlett={onCancel}
                            onAvbrytOgFortsettSenere={onContinueLater}
                            useNoTempSavingText={useNoTempSavingText}
                        />
                    </div>
                )}
            </section>
        </Page>
    );
};

export default Step;
