import { CalendarIcon, ChatElipsisIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import IconCircle from 'components/ikoner/IconCircle';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FormattedMessage } from 'react-intl';
import { isAlene } from 'types/HvemPlanlegger';

import { Alert, Button, ExpansionCard, HStack, Link, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const Oppsummering = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                <Alert variant="info">
                    <FormattedMessage
                        id="oppsummering.informasjonPlanleggerErUnderUtvikling"
                        values={{ a: (msg: any) => <Link>{msg}</Link> }}
                    />
                </Alert>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <IconCircle size="medium" color="green">
                                <CalendarIcon height={22} width={22} fontSize="1.5rem" />
                            </IconCircle>
                            <ExpansionCard.Title size="medium">
                                {isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="oppsummering.oppgittInformasjonDeg" />
                                ) : (
                                    <FormattedMessage id="oppsummering.oppgittInformasjon" />
                                )}
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <FormattedMessage id="oppsummering.oppgittInformasjonTekst" />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <IconCircle size="medium" color="green">
                                <ChatElipsisIcon height={22} width={22} fontSize="1.5rem" />
                            </IconCircle>
                            <ExpansionCard.Title size="medium">
                                {isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="oppsummering.planenDin" />
                                ) : (
                                    <FormattedMessage id="oppsummering.planenDeres" />
                                )}
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <FormattedMessage id="oppsummering.planenTekst" />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <VStack gap="10">
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
