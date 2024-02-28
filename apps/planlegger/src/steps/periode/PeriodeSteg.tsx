import { VStack } from '@navikt/ds-react';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { isAlene } from 'types/HvemPlanlegger';
import { Periode } from 'types/Periode';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const periode = useContextGetData(ContextDataType.PERIODE);
    const formMethods = useForm<Periode>({ defaultValues: periode });

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagrePeriode = useContextSaveData(ContextDataType.PERIODE);

    const lagre = (formValues: Periode) => {
        lagrePeriode(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                    {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                    <VStack gap="20">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack gap="10">
                            <StepButtonsHookForm<Periode>
                                saveDataOnPreviousClick={lagrePeriode}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                nextButtonText="Neste"
                                previousButtonText="Tilbake"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default PeriodeSteg;
