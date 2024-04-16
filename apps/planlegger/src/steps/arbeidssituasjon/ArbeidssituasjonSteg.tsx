import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Situasjon, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { Heading, Radio, Spacer, VStack } from '@navikt/ds-react';

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

    const oppdaterArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);
    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
        shouldUnregister: true,
    });

    const status = formMethods.watch('status');

    const erAlenesøker = isAlene(hvemPlanlegger);

    const lagre = (formValues: Arbeidssituasjon) => {
        oppdaterArbeidssituasjon(formValues);

        const nextStep =
            formValues.status === Arbeidsstatus.JOBBER ||
            (hvemPlanlegger.type !== Situasjon.FAR_OG_FAR && formValues.jobberAnnenPart)
                ? PlanleggerRoutes.HVOR_LANG_PERIODE
                : PlanleggerRoutes.OPPSUMMERING;

        if (nextStep === PlanleggerRoutes.OPPSUMMERING) {
            oppdaterPeriode(undefined);
            oppdaterFordeling(undefined);
        }

        navigator.goToNextStep(nextStep);
    };

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <Heading level="2" size="medium">
                        <FormattedMessage id="ArbeidssituasjonSteg.Tittel" />
                    </Heading>
                    <GreenRadioGroup
                        label={
                            <FormattedMessage
                                id="ArbeidssituasjonSteg.HvaGjelder"
                                values={{ erAlenesøker, navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                            />
                        }
                        name="status"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'ValidationMessage.Required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={Arbeidsstatus.JOBBER} autoFocus>
                            <FormattedMessage id="ArbeidssituasjonSteg.Jobber" />
                        </Radio>
                        <Radio value={Arbeidsstatus.UFØR}>
                            <FormattedMessage id="ArbeidssituasjonSteg.Ufør" />
                        </Radio>
                        <Radio value={Arbeidsstatus.INGEN}>
                            <FormattedMessage id="ArbeidssituasjonSteg.Ingen" />
                        </Radio>
                    </GreenRadioGroup>
                    {erAlenesøker && <Aleneforsørger status={status} />}
                    {!erAlenesøker && <FlereForsørgere status={status} hvemPlanlegger={hvemPlanlegger} />}
                    <Spacer />
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={oppdaterArbeidssituasjon}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default ArbeidssituasjonSteg;
