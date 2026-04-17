import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { captureMessage } from '@navikt/fp-observability';

import { ProgressStep, ProgressStepper } from '../progress-stepper/ProgressStepper';

interface StepProps<TYPE> {
    steps: Array<ProgressStep<TYPE>>;
    children: React.ReactNode;
    onStepChange?: (id: TYPE) => void;
    hideHeader?: boolean;
    someFieldsOptional?: boolean;
    noFieldsRequired?: boolean;
}

export const Step = <TYPE extends string>({
    steps,
    onStepChange,
    children,
    hideHeader,
    someFieldsOptional = false,
    noFieldsRequired = false,
}: StepProps<TYPE>) => {
    const currentStepIndex = steps.findIndex((s) => s.isSelected);
    const harValgtSteg = currentStepIndex !== -1;

    if (!harValgtSteg) {
        // Rapporter i stedet for å throwe – et inkonsistent stepConfig skal ikke krasje hele siden for brukeren
        captureMessage(`Step: Ingen valgte steg funnet (antall steg=${steps.length})`);
    }

    const title = harValgtSteg ? steps[currentStepIndex]!.label : '';

    return (
        <VStack gap="space-24">
            {harValgtSteg && (
                <div role="presentation">
                    <ProgressStepper steps={steps} hideHeader={hideHeader} onStepChange={onStepChange} />
                </div>
            )}
            {!noFieldsRequired && (
                <BodyShort>
                    {someFieldsOptional ? (
                        <FormattedMessage id="Step.HarValgfrieFelt" />
                    ) : (
                        <FormattedMessage id="Step.HarObligatoriskeFelt" />
                    )}
                </BodyShort>
            )}
            <section
                aria-label={harValgtSteg ? `Steg ${currentStepIndex + 1} av ${steps.length}:  ${title}` : undefined}
            >
                <VStack gap="space-16">{children}</VStack>
            </section>
        </VStack>
    );
};
