import { PlanleggerRoutes } from 'appData/routes';
import GreenHeading from 'components/boxes/GreenHeading';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { ProgressStep, ProgressStepper } from '@navikt/fp-ui';

import PlanleggerPage from './PlanleggerPage';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerStepPage: React.FunctionComponent<Props> = ({ steps, children }) => (
    <PlanleggerPage
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
    </PlanleggerPage>
);

export default PlanleggerStepPage;
