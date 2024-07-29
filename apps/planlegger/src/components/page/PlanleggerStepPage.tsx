import { PlanleggerRoutes } from 'appData/routes';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, Page, ProgressStep, ProgressStepper } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerStepPage = forwardRef<HTMLDivElement, Props>(({ steps, children }, ref) => (
    <>
        <Page
            header={
                <BlueHeading>
                    <VStack gap="4">
                        <Heading size="large">
                            <FormattedMessage id="PlanleggerStepPage.Tittel" />
                        </Heading>
                        <ProgressStepper steps={steps} hideExpandableStepInfo showBlueStatusBar />
                    </VStack>
                </BlueHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default PlanleggerStepPage;
