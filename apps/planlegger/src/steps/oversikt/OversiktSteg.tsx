import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
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

const OversiktSteg = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large" spacing>
                    <FormattedMessage id="oversikt.tittel" />
                </Heading>
                {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                {isAlene(hvemPlanlegger) && <Aleneforsørger />}

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
