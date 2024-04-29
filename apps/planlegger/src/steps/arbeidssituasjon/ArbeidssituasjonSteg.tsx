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

    const oppdaterArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const oppdaterHvorLangPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
        shouldUnregister: true,
    });

    const status = formMethods.watch('status');
    const jobberSøker2 = formMethods.watch('jobberAnnenPart');

    const erAlenesøker = erAlene(hvemPlanlegger);
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const onSubmit = (formValues: Arbeidssituasjon) => {
        oppdaterArbeidssituasjon(formValues);

        const minstEnJobber = formValues.status === Arbeidsstatus.JOBBER || formValues.jobberAnnenPart;

        if (minstEnJobber) {
            navigator.goToNextStep(PlanleggerRoutes.HVOR_LANG_PERIODE);
        } else {
            oppdaterFordeling(undefined);
            oppdaterHvorLangPeriode(undefined);
            navigator.goToNextStep(PlanleggerRoutes.OPPSUMMERING);
        }
    };

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading level="2" size="medium">
                            <FormattedMessage id="ArbeidssituasjonSteg.Tittel" />
                        </Heading>
                        {(erAlenesøker || erFarOgFar) && (
                            <GreenRadioGroup
                                label={
                                    <FormattedMessage id="Arbeidssituasjon.Forelder" values={{ navn: fornavnSøker1 }} />
                                }
                                name="status"
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'Arbeidssituasjon.Forelder.Required',
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
                        )}
                        {!erAlenesøker && !erFarOgFar && (
                            <GreenRadioGroup
                                label={
                                    <FormattedMessage
                                        id="ArbeidssituasjonSteg.HvaGjelder"
                                        values={{ erAlenesøker, navn: fornavnSøker1 }}
                                    />
                                }
                                name="status"
                                validate={[
                                    isRequired(
                                        intl.formatMessage(
                                            {
                                                id: 'ArbeidssituasjonSteg.HvaGjelder.Required',
                                            },
                                            { erAlenesøker, navn: fornavnSøker1 },
                                        ),
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
                        )}
                        {status === Arbeidsstatus.JOBBER && (
                            <JobberInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker1} />
                        )}
                        {status === Arbeidsstatus.UFØR && (
                            <UførInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker1} />
                        )}
                        {status === Arbeidsstatus.INGEN && (
                            <AnnetInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker1} erFarOgFar />
                        )}
                        {!erAlenesøker && status && (
                            <>
                                <GreenRadioGroup
                                    name="jobberAnnenPart"
                                    label={
                                        <FormattedMessage
                                            id="Arbeidssituasjon.AndreForelder"
                                            values={{ navn: fornavnSøker2 }}
                                        />
                                    }
                                    validate={[
                                        isRequired(
                                            intl.formatMessage(
                                                { id: 'Arbeidssituasjon.AndreForelder.Required' },
                                                { navn: fornavnSøker2 },
                                            ),
                                        ),
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
                                {jobberSøker2 === true && fornavnSøker2 && (
                                    <JobberInfoboks erAlenesøker={erAlenesøker} fornavn={fornavnSøker2} />
                                )}
                                {jobberSøker2 === false && fornavnSøker2 && (
                                    <AnnetInfoboks
                                        erAlenesøker={erAlenesøker}
                                        fornavn={fornavnSøker2}
                                        erSøker2
                                        erFarOgFar
                                    />
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
