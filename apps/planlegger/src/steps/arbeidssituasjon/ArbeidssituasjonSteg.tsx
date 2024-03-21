import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const intl = useIntl();
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

        if (
            formValues.arbeidssituasjon !== ArbeidssituasjonEnum.JOBBER &&
            (isAlene(hvemPlanlegger) || formValues.arbeidssituasjonAnnenPart === false)
        ) {
            return navigator.goToNextStep(PlanleggerRoutes.OPPSUMMERING);
        }

        return navigator.goToNextStep(PlanleggerRoutes.HVOR_LANG_PERIODE);
    };

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="5">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    <GreenRadioGroup
                        label={
                            erAlenesøker ? (
                                <FormattedMessage id="barnet.hvaGjelderDeg" />
                            ) : (
                                <FormattedMessage
                                    id={'arbeid.hvaGjelder'}
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            )
                        }
                        name="arbeidssituasjon"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'validation.required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={ArbeidssituasjonEnum.JOBBER} autoFocus>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.UFØR}>
                            <FormattedMessage id="arbeid.ufør" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.INGEN}>
                            <FormattedMessage id="arbeid.ingen" />
                        </Radio>
                    </GreenRadioGroup>
                    {erAlenesøker && <Aleneforsørger />}
                    {!erAlenesøker && <FlereForsørgere hvemPlanlegger={hvemPlanlegger} />}
                    <VStack gap="20">
                        <StepButtonsHookForm
                            saveDataOnPreviousClick={lagreArbeidssituasjon}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default ArbeidssituasjonSteg;
