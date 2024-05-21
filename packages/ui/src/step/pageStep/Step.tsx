import React from 'react';

import { VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import ProgressStepper, { ProgressStep } from '../progressStepper/ProgressStepper';
import Page from './Page';
import StepBanner from './StepBanner';
import './step.css';
import StepFooter from './stepFooter/StepFooter';

export interface StepProps<TYPE> {
    bannerTitle?: string;
    steps: Array<ProgressStep<TYPE>>;
    children: React.ReactNode;
    onCancel?: () => void;
    onContinueLater?: () => void;
    cancelOrContinueLaterAriaLabel?: string;
    pageAriaLabel?: string;
    infoMessage?: React.ReactNode;
}

const Step = <TYPE extends string>({
    bannerTitle,
    steps,
    onCancel,
    onContinueLater,
    cancelOrContinueLaterAriaLabel,
    children,
    pageAriaLabel,
    infoMessage,
}: StepProps<TYPE>) => {
    const currentStepIndex = steps.findIndex((s) => s.isSelected);
    if (currentStepIndex === -1) {
        return null;
    }

    const title = steps[currentStepIndex].label;

    const bem = bemUtils('step');
    return (
        <Page
            className={bem.block}
            ariaLabel={pageAriaLabel}
            topContentRenderer={() => <>{bannerTitle && <StepBanner text={bannerTitle} />}</>}
        >
            {infoMessage !== undefined && <div className={bem.element('infoMessage')}>{infoMessage}</div>}
            <VStack gap="6">
                <div role="presentation">
                    <ProgressStepper steps={steps} />
                </div>
                <section aria-label={`Steg ${currentStepIndex + 1} av ${steps.length}:  ${title}`}>
                    <VStack gap="4">
                        {children}
                        {(onCancel || onContinueLater) && (
                            <div
                                role={cancelOrContinueLaterAriaLabel ? 'complementary' : undefined}
                                aria-label={cancelOrContinueLaterAriaLabel}
                            >
                                <StepFooter onAvbrytOgSlett={onCancel} onAvbrytOgFortsettSenere={onContinueLater} />
                            </div>
                        )}
                    </VStack>
                </section>
            </VStack>
        </Page>
    );
};

export default Step;
