import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { ProgressStep, ProgressStepper } from '../progress-stepper/ProgressStepper';
import { Page } from './Page';
import { StepBanner } from './StepBanner';
import { StepFooter } from './step-footer/StepFooter';
import styles from './step.module.css';

interface StepProps<TYPE> {
    bannerTitle?: string;
    steps: Array<ProgressStep<TYPE>>;
    children: React.ReactNode;
    onCancel?: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    cancelOrContinueLaterAriaLabel?: string;
    pageAriaLabel?: string;
    infoMessage?: React.ReactNode;
    hideHeader?: boolean;
    someFieldsOptional?: boolean;
    noFieldsRequired?: boolean;
}

export const Step = <TYPE extends string>({
    bannerTitle,
    steps,
    onCancel,
    onContinueLater,
    onStepChange,
    cancelOrContinueLaterAriaLabel,
    children,
    pageAriaLabel,
    infoMessage,
    hideHeader,
    someFieldsOptional = false,
    noFieldsRequired = false,
}: StepProps<TYPE>) => {
    const currentStepIndex = steps.findIndex((s) => s.isSelected);
    if (currentStepIndex === -1) {
        return null;
    }

    const title = steps[currentStepIndex].label;

    return (
        <Page
            className={styles.step}
            ariaLabel={pageAriaLabel}
            topContentRenderer={() => <>{bannerTitle && <StepBanner text={bannerTitle} />}</>}
        >
            {infoMessage !== undefined && <div className={styles.infoMessage}>{infoMessage}</div>}
            <VStack gap="6">
                <div role="presentation">
                    <ProgressStepper steps={steps} hideHeader={hideHeader} onStepChange={onStepChange} />
                </div>
                {!noFieldsRequired && (
                    <BodyShort>
                        {someFieldsOptional ? (
                            <FormattedMessage id="Step.HarValgfrieFelt" />
                        ) : (
                            <FormattedMessage id="Step.HarObligatoriskeFelt" />
                        )}
                    </BodyShort>
                )}
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
