import { BodyLong, Button, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import Kalender from 'components/ikoner/Kalender';
import OppsummeringCheck from 'components/ikoner/OppsummeringCheck';
import { PlanleggerRoutes } from 'appData/routes';

const Oppsummering = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large">
                    <HStack gap="5" align="center">
                        <OppsummeringCheck />
                        <FormattedMessage id="oppsummering.tittel" />
                    </HStack>
                </Heading>

                <BodyLong size="large">
                    <FormattedMessage id="oppsummering.ingress" />
                </BodyLong>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <Spørsmålstegn />
                            <ExpansionCard.Title size="medium">
                                <FormattedMessage id="oppsummering.info.tittel" />
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <FormattedMessage id="oppsummering.info.tekst" />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <Kalender />
                            <ExpansionCard.Title size="medium">
                                <FormattedMessage id="oppsummering.planInfo.tittel" />
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <FormattedMessage id="oppsummering.planInfo.tekst" />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <VStack gap="32">
                    <VStack gap="20">
                        <StepButtonWrapper>
                            <Button variant="secondary" type="button">
                                Eksporter kalender
                            </Button>
                            <Button variant="secondary" type="button">
                                Gjør endringer
                            </Button>
                        </StepButtonWrapper>
                    </VStack>

                    <VStack gap="10" className="button-wrapper content-wrapper">
                        <StepButtons
                            nextButtonText="Legg til i søknad"
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={() => navigate(PlanleggerRoutes.OM_PLANLEGGEREN)}
                            previousButtonText="Tilbake"
                        ></StepButtons>

                        <VStack align="center">
                            <Button variant="tertiary" onClick={() => navigate(PlanleggerRoutes.OM_PLANLEGGEREN)}>
                                Avbryt
                            </Button>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default Oppsummering;
