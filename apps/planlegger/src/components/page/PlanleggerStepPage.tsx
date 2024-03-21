import { PlanleggerRoutes } from 'appData/routes';
import GreenHeading from 'components/boxes/GreenHeading';
import ProgressStepper, { ProgressStep } from 'components/progressStepper/ProgressStepper';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

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
                        <FormattedMessage id="om.tittel" />
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
