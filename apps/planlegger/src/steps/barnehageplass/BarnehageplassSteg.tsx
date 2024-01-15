import { FormattedMessage } from 'react-intl';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { BodyLong, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { PlanleggerRoutes } from 'appData/routes';
import Kalender from 'components/ikoner/Kalender';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="barnehageplass.tittel" />
                </Heading>

                <Box borderColor="border-alt-3" padding="4" borderWidth="2" borderRadius="xlarge">
                    <VStack gap="2">
                        <Heading size="small">
                            <FormattedMessage id="barnehageplass.datoTittel" />
                        </Heading>

                        <HStack gap="5" align="center">
                            <Kalender />
                            <BodyLong>
                                <FormattedMessage id="barnehageplass.dato" />
                            </BodyLong>
                        </HStack>
                        <BodyLong>
                            <FormattedMessage id="barnehageplass.datoTekst" />
                        </BodyLong>
                    </VStack>
                </Box>

                <Box padding="4" borderRadius="large" background="bg-subtle">
                    <VStack gap="2">
                        <Heading size="small">
                            <FormattedMessage id="barnehageplass.barnehageTittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="barnehageplass.barnehageTekst" />
                        </BodyLong>
                    </VStack>
                </Box>

                <Box padding="4" borderRadius="large" background="bg-subtle">
                    <VStack gap="2">
                        <Heading size="small">
                            <FormattedMessage id="barnehageplass.kommuneTittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="barnehageplass.kommuneTekst" />
                        </BodyLong>
                    </VStack>
                </Box>

                <Box padding="4" borderRadius="large" background="bg-subtle">
                    <VStack gap="2">
                        <Heading size="small">
                            <FormattedMessage id="barnehageplass.alleredeTittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="barnehageplass.alleredeTekst" />
                        </BodyLong>
                        <HStack>
                            <Button variant="secondary" type="button">
                                <FormattedMessage id="barnehageplass.knapp" />
                            </Button>
                        </HStack>
                    </VStack>
                </Box>

                <VStack gap="20">
                    <HvorforSpørViOmDette text="TODO" />
                    <VStack className="button-wrapper content-wrapper">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonText="Neste"
                            previousButtonText="Tilbake"
                            nextButtonOnClick={() => {
                                navigator.goToNextStep(PlanleggerRoutes.ARBEIDSSITUASJON);
                            }}
                        />
                    </VStack>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default BarnehageplassSteg;
