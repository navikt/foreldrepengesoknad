import { FormattedMessage } from 'react-intl';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { BodyLong, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { PlanleggerRoutes } from 'appData/routes';
import Kalender from 'components/ikoner/Kalender';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="barnehageplass.tittel" />
                </Heading>
                <VStack gap="10">
                    <VStack gap="10">
                        <Box borderColor="border-alt-3" padding="4" borderWidth="2" borderRadius="xlarge">
                            <VStack gap="1">
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
                    </VStack>
                    {/*TODO funker ikke*/}
                    {hvemPlanlegger.hvem === SøkersituasjonEnum.ALENE && (
                        <VStack gap="10">
                            <Box borderColor="border-alt-3" padding="4" borderWidth="2" borderRadius="xlarge">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.datoTittelDeg" />
                                    </Heading>
                                    <HStack gap="5" align="center">
                                        <Kalender />
                                        <BodyLong>
                                            <FormattedMessage id="barnehageplass.dato" />
                                        </BodyLong>
                                    </HStack>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.datoTekstDeg" />
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
                        </VStack>
                    )}
                </VStack>

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
