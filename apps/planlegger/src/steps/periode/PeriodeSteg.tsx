import { VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { Periode } from 'types/Periode';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { notEmpty } from '@navikt/fp-validation';
import FlereForsørgere from './situasjon/FlereForsørgere';
import Aleneforsørger from './situasjon/Aleneforsørger';

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const periode = useContextGetData(ContextDataType.PERIODE);
    const formMethods = useForm<Periode>({ defaultValues: periode });

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagrePeriode = useContextSaveData(ContextDataType.PERIODE);

    const lagre = (formValues: Periode) => {
        lagrePeriode(formValues);
        navigator.goToNextStep(PlanleggerRoutes.PLAN_INFO);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR && <Aleneforsørger />}
                    {hvemPlanlegger.type === SøkersituasjonEnum.FAR && <Aleneforsørger />}

                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR && <FlereForsørgere />}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_MEDMOR && <FlereForsørgere />}
                    {hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR && <FlereForsørgere />}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack gap="10" className="button-wrapper content-wrapper">
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
        </ContentWrapper>
    );
};

export default PeriodeSteg;
