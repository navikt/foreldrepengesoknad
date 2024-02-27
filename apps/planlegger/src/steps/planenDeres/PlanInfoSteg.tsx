import { BodyLong, BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Check from 'components/ikoner/Check';
import Kalender from 'components/ikoner/Kalender';
import Penn from 'components/ikoner/Penn';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FormattedMessage } from 'react-intl';
import { isAlene } from 'types/HvemPlanlegger';

const PlanInfoSteg = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                {!isAlene(hvemPlanlegger) && (
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

                        <VStack gap="5">
                            <Heading level="2" size="small">
                                <FormattedMessage id="planInfo.underoverskrift" />
                            </Heading>

                            <HStack gap="4" wrap={false}>
                                <Kalender />
                                <BodyShort>
                                    <FormattedMessage id="planInfo.trinn1" />
                                </BodyShort>
                            </HStack>

                            <HStack gap="4" wrap={false}>
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
                        </VStack>
                    </VStack>
                )}
                {isAlene(hvemPlanlegger) && (
                    <VStack gap="10">
                        <Heading size="large">
                            <FormattedMessage id="planInfo.tittelDeg" />
                        </Heading>

                        <BodyLong size="large">
                            <FormattedMessage id="planInfo.ingress.del1Deg" />
                        </BodyLong>
                        <BodyLong size="large">
                            <FormattedMessage id="planInfo.ingress.del2Deg" />
                        </BodyLong>

                        <VStack gap="5">
                            <Heading level="2" size="small">
                                <FormattedMessage id="planInfo.underoverskrift" />
                            </Heading>

                            <HStack gap="4" wrap={false}>
                                <Kalender />
                                <BodyShort>
                                    <FormattedMessage id="planInfo.trinn1Deg" />
                                </BodyShort>
                            </HStack>

                            <HStack gap="4" wrap={false}>
                                <Penn />
                                <BodyShort>
                                    <FormattedMessage id="planInfo.trinn2Deg" />
                                </BodyShort>
                            </HStack>

                            <HStack gap="4" align="center">
                                <Check />
                                <BodyShort>
                                    <FormattedMessage id="planInfo.trinn3Deg" />
                                </BodyShort>
                            </HStack>
                        </VStack>

                        <VStack gap="20">
                            <ExpansionCard aria-label="">
                                <ExpansionCard.Header>
                                    <div>
                                        <ExpansionCard.Title size="medium">
                                            <FormattedMessage id="planInfo.info.tittelDeg" />
                                        </ExpansionCard.Title>
                                    </div>
                                </ExpansionCard.Header>
                                <ExpansionCard.Content>
                                    <FormattedMessage id="planInfo.info.tekst" />
                                </ExpansionCard.Content>
                            </ExpansionCard>
                        </VStack>
                    </VStack>
                )}
                <VStack gap="10">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        nextButtonText="Se oversikt"
                        previousButtonText="Tilbake"
                    />
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default PlanInfoSteg;
