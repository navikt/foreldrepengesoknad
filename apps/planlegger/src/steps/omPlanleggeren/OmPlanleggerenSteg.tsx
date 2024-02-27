import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';
import Kalender from 'components/ikoner/Kalender';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import { FormattedMessage } from 'react-intl';

import { ArrowRightIcon } from '@navikt/aksel-icons';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';

const OmPlanleggerenSteg = () => {
    const navigator = usePlanleggerNavigator();

    return (
        <PlanleggerPage isFrontpage steps={[]}>
            <VStack gap="10">
                <BodyShort size="large">
                    <FormattedMessage id="om.ingress" />
                </BodyShort>
                <VStack gap="20">
                    <VStack gap="5">
                        <Heading level="2" size="xsmall">
                            <FormattedMessage id="om.underoverskrift" />
                        </Heading>
                        <HStack gap="4" align="center">
                            <Spørsmålstegn />
                            <BodyShort>
                                <FormattedMessage id="om.trinn1" />
                            </BodyShort>
                        </HStack>
                        <HStack gap="4" align="center">
                            <Kalender />
                            <BodyShort>
                                <FormattedMessage id="om.trinn2" />
                            </BodyShort>
                        </HStack>
                    </VStack>
                    <HStack justify="center">
                        <Button onClick={navigator.goToNextDefaultStep} icon={<ArrowRightIcon />} iconPosition="right">
                            <FormattedMessage id="om.start.planlegger" />
                        </Button>
                    </HStack>
                </VStack>
                <Show above="md" asChild>
                    <div>Språkvelger</div>
                </Show>
            </VStack>
        </PlanleggerPage>
    );
};

export default OmPlanleggerenSteg;
