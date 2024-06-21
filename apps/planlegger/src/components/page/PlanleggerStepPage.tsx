import { PlanleggerRoutes } from 'appData/routes';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { GreenHeading, Page, ProgressStep, ProgressStepper } from '@navikt/fp-ui';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerStepPage = forwardRef<HTMLDivElement, Props>(({ steps, children }, ref) => (
    <>
        <Page
            header={
                <GreenHeading>
                    <VStack gap="4">
                        <Heading size="large">
                            <FormattedMessage id="PlanleggerStepPage.Tittel" />
                        </Heading>
                        <ProgressStepper steps={steps} hideExpandableStepInfo showGreenStatusBar />
                    </VStack>
                </GreenHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default PlanleggerStepPage;
