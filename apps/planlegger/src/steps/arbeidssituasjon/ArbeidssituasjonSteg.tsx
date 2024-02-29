import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { isAlene } from 'types/HvemPlanlegger';

import { Heading, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';

import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

export const HVOR_LENGE_LENKE = 'https://www.nav.no/foreldrepenger#hvor-lenge';
export const VEIVISER_LENKE = 'https://familie.nav.no/veiviser';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagreArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const lagre = (formValues: Arbeidssituasjon) => {
        lagreArbeidssituasjon(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                    {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                    <VStack gap="20">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack>
                            <StepButtonsHookForm
                                saveDataOnPreviousClick={lagreArbeidssituasjon}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default ArbeidssituasjonSteg;
