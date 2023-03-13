import React from 'react';
import bemUtils from './../../utils/bemUtils';
import Page from './Page';
import StepIndicator, { StepIndicatorStep } from '../step-indicator/StepIndicator';
import StepBanner from '../step-banner/StepBanner';
import Block from '../block/Block';
import BackLink from '../back-link/BackLink';
import StepFooter from '../step-footer/StepFooter';

import './step.less';
import { Heading } from '@navikt/ds-react';

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

const Step: React.FunctionComponent<StepProps> = ({
    bannerTitle,
    pageTitle,
    stepTitle,
    backLinkHref,
    backLinkOnClick,
    steps,
    activeStepId,
    onCancel,
    onContinueLater,
    cancelOrContinueLaterAriaLabel,
    showStepIndicator = true,
    children,
    previousStepTitle,
    pageAriaLabel,
    kompakt,
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
                    <Block padBottom="l">
                        <Heading size="medium" className={bem.element('title')}>
                            {stepTitle}
                        </Heading>
                    </Block>
                    <div role="presentation" aria-hidden={true}>
                        <StepIndicator kompakt={kompakt} steps={steps} activeStep={currentStepIndex} />
                    </div>
                    {backLinkHref && (
                        <BackLink
                            href={backLinkHref}
                            ariaLabel={previousStepTitle}
                            className={bem.element('backLink')}
                            onClick={backLinkOnClick}
                        />
                    )}
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
