import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { PlanleggerRoutes } from 'appData/routes';
import { isAlene } from 'types/HvemPlanlegger';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import { PeriodeEnum } from 'types/Periode';

const OversiktSteg = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));

    return (
        <ContentWrapper>
            <VStack gap="10">
                {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                <VStack gap="2">
                    <HStack gap="32">
                        <HStack gap="5" align="center">
                            <BlåSirkel />
                            <BodyShort>
                                {valgtPeriode.periode === PeriodeEnum.HUNDRE && (
                                    <FormattedMessage id="ukerForeldrepenger.100" />
                                )}
                                {valgtPeriode.periode === PeriodeEnum.ÅTTI && (
                                    <FormattedMessage id="ukerForeldrepenger.80" />
                                )}
                            </BodyShort>
                        </HStack>

                        <HStack gap="5" align="center">
                            <Hjerte />
                            <BodyShort>
                                <FormattedMessage id="termindatoIkontekst" />
                            </BodyShort>
                        </HStack>
                    </HStack>

                    <HStack gap="4">
                        <HStack gap="5" align="center">
                            <RosaSirkel />
                            <BodyShort>
                                <FormattedMessage id="barnehagestartIkontekst" />
                            </BodyShort>
                        </HStack>
                    </HStack>
                </VStack>
                <VStack gap="10">
                    <VStack gap="2">
                        <Heading size="small" spacing>
                            <FormattedMessage id="oversikt.2024" />
                        </Heading>
                        <Box padding="4" borderRadius="large" background="surface-alt-3-subtle">
                            <BodyShort>Kalenderoversikt</BodyShort>
                        </Box>
                    </VStack>

                    <VStack gap="2">
                        <Heading size="small" spacing>
                            <FormattedMessage id="oversikt.2025" />
                        </Heading>
                        <Box padding="4" borderRadius="large" background="surface-alt-3-subtle">
                            <BodyShort>Kalenderoversikt</BodyShort>
                        </Box>
                    </VStack>
                </VStack>

                <VStack gap="10" className="button-wrapper content-wrapper">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OPPSUMMERING)}
                        nextButtonText="Tilpass plan"
                        previousButtonText="Tilbake"
                    />
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default OversiktSteg;
