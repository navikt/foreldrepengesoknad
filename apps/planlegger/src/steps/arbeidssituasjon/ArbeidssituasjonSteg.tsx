import { Heading, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { notEmpty } from '@navikt/fp-validation';
import { isAlene } from 'types/HvemPlanlegger';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();

    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagreArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const lagre = (formValues: Arbeidssituasjon) => {
        lagreArbeidssituasjon(formValues);
        navigator.goToNextStep(PlanleggerRoutes.PERIODE);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading size="large">
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                    {!isAlene(hvemPlanlegger) && <FlereForsørgere />}

                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack className="button-wrapper content-wrapper">
                            <StepButtonsHookForm
                                saveDataOnPreviousClick={lagreArbeidssituasjon}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                nextButtonText="Neste"
                                previousButtonText="Tilbake"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </ContentWrapper>
    );
};

export default ArbeidssituasjonSteg;
