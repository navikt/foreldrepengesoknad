import { PlanleggerRoutes } from 'appData/routes';
import GreenHeading from 'components/GreenHeading';
import ProgressStepper, { ProgressStep } from 'components/progressStepper/ProgressStepper';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import styles from './planleggerPage.module.css';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerPage: React.FunctionComponent<Props> = ({ steps, children }) => {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <GreenHeading>
                    <VStack gap="4">
                        <Heading size="large">
                            <FormattedMessage id="om.tittel" />
                        </Heading>
                        <ProgressStepper steps={steps} hideExpandableStepInfo showGreenStatusBar />
                    </VStack>
                </GreenHeading>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default PlanleggerPage;
