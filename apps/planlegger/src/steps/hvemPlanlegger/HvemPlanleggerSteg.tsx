import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/boxes/GreenPanel';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, erFarDelAvSøknaden, erMorDelAvSøknaden } from 'types/HvemPlanlegger';
import { formatError } from 'utils/customErrorFormatter';

import { Radio, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import { Situasjon } from '../../types/Søkersituasjon';

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
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <GreenRadioGroup
                        name="type"
                        label={intl.formatMessage({
                            id: 'HvemPlanleggerSteg.HvemPlanlegger',
                        })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'validation.required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={Situasjon.MOR_OG_FAR} autoFocus>
                            <FormattedMessage id="hvem.morOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR_OG_MEDMOR}>
                            <FormattedMessage id="hvem.morOgMedmor" />
                        </Radio>
                        <Radio value={Situasjon.FAR_OG_FAR}>
                            <FormattedMessage id="hvem.farOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR}>
                            <FormattedMessage id="hvem.bareMor" />
                        </Radio>
                        <Radio value={Situasjon.FAR}>
                            <FormattedMessage id="hvem.bareFar" />
                        </Radio>
                    </GreenRadioGroup>
                    {type && (
                        <GreenPanel isDarkGreen={erHvemPlanleggerIkkeOppgittFraFør}>
                            <VStack gap="10">
                                {erMorDelAvSøknaden(type) && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'navn.mor' })}
                                        name="navnPåMor"
                                        autofocusWhenEmpty
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {erFarDelAvSøknaden(type) && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'navn.far' })}
                                        name="navnPåFar"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {type === Situasjon.MOR_OG_MEDMOR && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'navn.medmor' })}
                                        name="navnPåMedmor"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                                {type === Situasjon.FAR_OG_FAR && (
                                    <TextField
                                        label={intl.formatMessage({ id: 'navn.far' })}
                                        name="navnPåMedfar"
                                        customErrorFormatter={formatError}
                                    />
                                )}
                            </VStack>
                        </GreenPanel>
                    )}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} useSimplifiedTexts />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default HvemPlanleggerSteg;
