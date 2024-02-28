import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Kalender from 'components/ikoner/Kalender';
import OppsummeringCheck from 'components/ikoner/OppsummeringCheck';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Button, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { StepButtonWrapper } from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';

const Oppsummering = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                <div className="panel-top green">
                    <Heading size="large">
                        <HStack gap="5" align="center">
                            <OppsummeringCheck />
                            <FormattedMessage id="oppsummering.tittel" />
                        </HStack>
                    </Heading>
                </div>

                <BodyLong size="large">
                    <FormattedMessage id="oppsummering.ingress" values={{ i: (msg: any) => <i>{msg}</i> }} />
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
                                <FormattedMessage id="oppsummering.eksporterKalender" />
                            </Button>
                            <Button variant="secondary" type="button">
                                <FormattedMessage id="oppsummering.gjørEndringer" />
                            </Button>
                        </StepButtonWrapper>
                    </VStack>

                    <VStack gap="10">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={() => undefined}
                            useSimplifiedTexts
                        ></StepButtons>

                        <VStack align="center">
                            <Button variant="tertiary" onClick={() => undefined}>
                                Avbryt
                            </Button>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default Oppsummering;
