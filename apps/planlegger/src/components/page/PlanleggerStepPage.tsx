import { PlanleggerRoutes } from 'appData/routes';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, Page, ProgressStep, ProgressStepper } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    goToStep: (nextPath: PlanleggerRoutes) => void;
    children: React.ReactElement | React.ReactElement[];
}

export const PlanleggerStepPage = forwardRef<HTMLDivElement, Props>(({ steps, children, goToStep }, ref) => (
    <>
        <Page
            header={
                <BlueHeading>
                    <VStack gap="space-16">
                        <Heading size="large">
                            <FormattedMessage id="PlanleggerStepPage.Tittel" />
                        </Heading>
                        <ProgressStepper steps={steps} onStepChange={goToStep} hideHeader />
                    </VStack>
                </BlueHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));
