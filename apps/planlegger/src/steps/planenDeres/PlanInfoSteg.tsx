import { BodyLong, BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import Kalender from 'components/ikoner/Kalender';
import { FormattedMessage } from 'react-intl';
import Penn from 'components/ikoner/Penn';
import Check from 'components/ikoner/Check';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { PlanleggerRoutes } from 'appData/routes';

const PlanInfoSteg = () => {
    const navigator = usePlanleggerNavigator();
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="planInfo.tittel" />
                </Heading>

                <BodyLong size="large">
                    <FormattedMessage id="planInfo.ingress.del1" />
                </BodyLong>
                <BodyLong size="large">
                    <FormattedMessage id="planInfo.ingress.del2" />
                </BodyLong>

                <Heading level="2" size="small">
                    <FormattedMessage id="planInfo.underoverskrift" />
                </Heading>

                <VStack gap="5">
                    <HStack gap="4" align="center">
                        <Kalender />
                        <BodyShort>
                            <FormattedMessage id="planInfo.trinn1" />
                        </BodyShort>
                    </HStack>

                    <HStack gap="4" align="center">
                        <Penn />
                        <BodyShort>
                            <FormattedMessage id="planInfo.trinn2" />
                        </BodyShort>
                    </HStack>

                    <HStack gap="4" align="center">
                        <Check />
                        <BodyShort>
                            <FormattedMessage id="planInfo.trinn3" />
                        </BodyShort>
                    </HStack>
                </VStack>

                <VStack gap="20">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div>
                                <ExpansionCard.Title size="medium">
                                    <FormattedMessage id="planInfo.info.tittel" />
                                </ExpansionCard.Title>
                            </div>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <FormattedMessage id="planInfo.info.tekst" />
                        </ExpansionCard.Content>
                    </ExpansionCard>

                    <VStack gap="10" className="button-wrapper content-wrapper">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={() => navigate(PlanleggerRoutes.OVERSIKT)}
                            nextButtonText="Se oversikt"
                            previousButtonText="Tilbake"
                        />
                    </VStack>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default PlanInfoSteg;
