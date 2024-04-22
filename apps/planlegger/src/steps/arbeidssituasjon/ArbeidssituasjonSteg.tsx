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
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Heading, Radio, Spacer, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import AnnetInfoboks from './info/AnnetInfoboks';
import JobberInfoboks from './info/JobberInfoboks';
import UførInfoboks from './info/UførInfoboks';

interface Props {
    locale: LocaleAll;
}

const ArbeidssituasjonSteg: FunctionComponent<Props> = ({ locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);
    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
        shouldUnregister: true,
    });

    const status = formMethods.watch('status');
    const jobberAnnenPart = formMethods.watch('jobberAnnenPart');

    const erAlenesøker = isAlene(hvemPlanlegger);
    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger, intl);

    const lagre = (formValues: Arbeidssituasjon) => {
        oppdaterArbeidssituasjon(formValues);

        const kunFar2HarRettForFødsel =
            hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
            formValues.status !== Arbeidsstatus.JOBBER &&
            omBarnet.erFødsel;

        const nextStep =
            (formValues.status !== Arbeidsstatus.JOBBER && formValues.jobberAnnenPart !== true) ||
            kunFar2HarRettForFødsel
                ? PlanleggerRoutes.OPPSUMMERING
                : PlanleggerRoutes.HVOR_LANG_PERIODE;

        if (nextStep === PlanleggerRoutes.OPPSUMMERING) {
            oppdaterPeriode(undefined);
            oppdaterFordeling(undefined);
        }

        navigator.goToNextStep(nextStep);
    };

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading level="2" size="medium">
                            <FormattedMessage id="ArbeidssituasjonSteg.Tittel" />
                        </Heading>
                        {erAlenesøker && (
                            <>
                                <GreenRadioGroup
                                    label={
                                        <FormattedMessage
                                            id="Arbeidssituasjon.Forelder"
                                            values={{ navn: fornavnSøker }}
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
                                    onChange={scrollToBottom}
                                >
                                    <Radio value={Arbeidsstatus.JOBBER} autoFocus>
                                        <FormattedMessage id="DefaultMessage.Ja" />
                                    </Radio>
                                    <Radio value={Arbeidsstatus.INGEN}>
                                        <FormattedMessage id="DefaultMessage.Nei" />
                                    </Radio>
                                </GreenRadioGroup>
                                {status === Arbeidsstatus.JOBBER && (
                                    <JobberInfoboks erAlenesøker fornavn={fornavnSøker} />
                                )}
                                {status === Arbeidsstatus.INGEN && (
                                    <AnnetInfoboks erAlenesøker fornavn={fornavnSøker} />
                                )}
                            </>
                        )}
                        {!erAlenesøker && (
                            <>
                                <GreenRadioGroup
                                    label={
                                        <FormattedMessage
                                            id="ArbeidssituasjonSteg.HvaGjelder"
                                            values={{ erAlenesøker, navn: fornavnSøker }}
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
                                    onChange={scrollToBottom}
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
                                {status === Arbeidsstatus.JOBBER && (
                                    <JobberInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker} />
                                )}
                                {status === Arbeidsstatus.UFØR && (
                                    <UførInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker} />
                                )}
                                {status === Arbeidsstatus.INGEN && (
                                    <AnnetInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker} />
                                )}
                                {status && (
                                    <>
                                        <GreenRadioGroup
                                            name="jobberAnnenPart"
                                            label={
                                                <FormattedMessage
                                                    id="Arbeidssituasjon.AndreForelder"
                                                    values={{ navn: fornavnAnnenPart }}
                                                />
                                            }
                                            validate={[
                                                isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                                            ]}
                                            shouldFadeIn
                                            onChange={scrollToBottom}
                                        >
                                            <Radio value={true} autoFocus>
                                                <FormattedMessage id="DefaultMessage.Ja" />
                                            </Radio>
                                            <Radio value={false}>
                                                <FormattedMessage id="DefaultMessage.Nei" />
                                            </Radio>
                                        </GreenRadioGroup>
                                        {jobberAnnenPart === true && fornavnAnnenPart && (
                                            <JobberInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnAnnenPart} />
                                        )}
                                        {jobberAnnenPart === false && fornavnAnnenPart && (
                                            <AnnetInfoboks
                                                erAlenesøker={erAlenesøker}
                                                fornavn={fornavnAnnenPart}
                                                erAnnenPart
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </VStack>
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
