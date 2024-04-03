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
import { getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

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

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const status = formMethods.watch('status');

    const erAlenesøker = isAlene(hvemPlanlegger);

    const lagre = (formValues: Arbeidssituasjon) => {
        oppdaterArbeidssituasjon(formValues);

        const nextStep =
            formValues.status !== Arbeidsstatus.JOBBER && (erAlenesøker || formValues.jobberAnnenPart === false)
                ? PlanleggerRoutes.OPPSUMMERING
                : PlanleggerRoutes.HVOR_LANG_PERIODE;
        navigator.goToNextStep(nextStep);
    };

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
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
                        name="status"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'validation.required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={Arbeidsstatus.JOBBER} autoFocus>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <Radio value={Arbeidsstatus.UFØR}>
                            <FormattedMessage id="arbeid.ufør" />
                        </Radio>
                        <Radio value={Arbeidsstatus.INGEN}>
                            <FormattedMessage id="arbeid.ingen" />
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
