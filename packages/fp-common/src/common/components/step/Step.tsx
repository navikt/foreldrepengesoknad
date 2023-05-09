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
    pageTitle: string;
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

const Step: React.FunctionComponent<StepProps> = ({
    bannerTitle,
    pageTitle,
    backLinkHref,
    steps,
    activeStepId,
    onCancel,
    onContinueLater,
    cancelOrContinueLaterAriaLabel,
    showStepIndicator = true,
    children,
    pageAriaLabel,
    infoMessage,
}) => {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStepId);
    const bem = bemUtils('step');
    return (
        <Page
            className={bem.block}
            title={pageTitle}
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
            {(showStepIndicator || backLinkHref) && (
                <>
                    <div role="presentation" aria-hidden={true}>
                        <ProgressStepper
                            steps={steps}
                            currentStepIndex={currentStepIndex}
                            titleHeadingLevel="2"
                        ></ProgressStepper>
                    </div>
                </>
            )}
            <section aria-label={`Steg ${currentStepIndex + 1} av ${steps.length}:  ${pageTitle}`}>
                <Block margin="xl">{children}</Block>

                {(onCancel || onContinueLater) && (
                    <div
                        role={cancelOrContinueLaterAriaLabel ? 'complementary' : undefined}
                        aria-label={cancelOrContinueLaterAriaLabel}
                    >
                        <StepFooter onAvbrytOgSlett={onCancel} onAvbrytOgFortsettSenere={onContinueLater} />
                    </div>
                )}
            </section>
        </Page>
    );
};

export default Step;
