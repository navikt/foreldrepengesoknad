import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/boxes/GreenPanel';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, Situasjon, erFarDelAvSøknaden, erMorDelAvSøknaden } from 'types/HvemPlanlegger';
import { formatError } from 'utils/customErrorFormatter';

import { Radio, Spacer, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';

const HvemPlanleggerSteg: FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);
    const oppdaterHvemPlanlegger = useContextSaveData(ContextDataType.HVEM_PLANLEGGER);

    const lagre = (formValues: HvemPlanlegger) => {
        oppdaterHvemPlanlegger(formValues);
        navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<HvemPlanlegger>({ defaultValues: hvemPlanlegger });

    const type = formMethods.watch('type');

    const erHvemPlanleggerIkkeOppgittFraFør = hvemPlanlegger === undefined;

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <GreenRadioGroup
                        name="type"
                        label={intl.formatMessage({
                            id: 'HvemPlanleggerSteg.HvemPlanlegger',
                        })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'ValidationMessage.Required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={Situasjon.MOR_OG_FAR} autoFocus>
                            <FormattedMessage id="HvemPlanleggerSteg.MorOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR_OG_MEDMOR}>
                            <FormattedMessage id="HvemPlanleggerSteg.MorOgMedmor" />
                        </Radio>
                        <Radio value={Situasjon.FAR_OG_FAR}>
                            <FormattedMessage id="HvemPlanleggerSteg.FarOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR}>
                            <FormattedMessage id="HvemPlanleggerSteg.BareMor" />
                        </Radio>
                        <Radio value={Situasjon.FAR}>
                            <FormattedMessage id="HvemPlanleggerSteg.BareFar" />
                        </Radio>
                    </GreenRadioGroup>
                    {type && (
                        <GreenPanel isDarkGreen={erHvemPlanleggerIkkeOppgittFraFør} shouldFadeIn>
                            <VStack gap="10">
                                {erMorDelAvSøknaden(type) && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Mor' })}
                                        name="navnPåMor"
                                        autofocusWhenEmpty
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {erFarDelAvSøknaden(type) && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Far' })}
                                        name="navnPåFar"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {type === Situasjon.MOR_OG_MEDMOR && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Medmor' })}
                                        name="navnPåMedmor"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {type === Situasjon.FAR_OG_FAR && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Far' })}
                                        name="navnPåMedfar"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                            </VStack>
                        </GreenPanel>
                    )}
                    <Spacer />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} useSimplifiedTexts />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default HvemPlanleggerSteg;
