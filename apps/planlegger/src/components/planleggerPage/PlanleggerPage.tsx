import { ClockIcon } from '@navikt/aksel-icons';
import { HStack, Heading, Show, VStack } from '@navikt/ds-react';
import GreenHeading from 'components/GreenHeading';
import { FormattedMessage } from 'react-intl';
import styles from './planleggerPage.module.css';
import ProgressStepper, { ProgressStep } from 'components/progressStepper/ProgressStepper';
import { PlanleggerRoutes } from 'appData/routes';
import LanguageToggle from 'components/LanguageToggle';

const EMPTY_STEPS = [] as Array<ProgressStep<PlanleggerRoutes>>;

interface Props {
    isFrontpage?: boolean;
    steps?: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerPage: React.FunctionComponent<Props> = ({ isFrontpage = false, steps = EMPTY_STEPS, children }) => {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <GreenHeading>
                    <Show below="md" asChild>
                        <LanguageToggle />
                    </Show>
                    <>
                        {isFrontpage && (
                            <VStack gap="1">
                                <Heading size="large">
                                    <FormattedMessage id="om.tittel" />
                                </Heading>
                                <Heading size="small">
                                    <HStack gap="2" align="center">
                                        <ClockIcon />
                                        <FormattedMessage id="om.label" />
                                    </HStack>
                                </Heading>
                            </VStack>
                        )}
                        {!isFrontpage && <ProgressStepper steps={steps} hideExpandableStepInfo showGreenStatusBar />}
                    </>
                </GreenHeading>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default PlanleggerPage;
