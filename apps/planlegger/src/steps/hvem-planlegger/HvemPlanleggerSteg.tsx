import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { useStepData } from 'appData/useStepData';
import { BlueRadioGroup } from 'components/form-wrappers/BlueRadioGroup';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { formatError } from 'utils/customErrorFormatter';

import { BodyShort, Radio, Spacer, VStack } from '@navikt/ds-react';

import { RhfForm, RhfTextField, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { HvemPlanleggerType } from '@navikt/fp-types';
import { BluePanel } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { isRequired } from '@navikt/fp-validation';

import { usePlanleggerNavigator } from '../../app-data/usePlanleggerNavigator';

const erMorDelAvSøknadenGittType = (type: HvemPlanleggerType) => {
    return (
        type === HvemPlanleggerType.MOR_OG_FAR ||
        type === HvemPlanleggerType.MOR_OG_MEDMOR ||
        type === HvemPlanleggerType.MOR
    );
};

const erFarDelAvSøknadenGittType = (type: HvemPlanleggerType) => {
    return (
        type === HvemPlanleggerType.MOR_OG_FAR ||
        type === HvemPlanleggerType.FAR_OG_FAR ||
        type === HvemPlanleggerType.FAR
    );
};

export const HvemPlanleggerSteg = () => {
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

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig} goToStep={navigator.goToNextStep}>
            <RhfForm formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <BodyShort>
                            <FormattedMessage id="HarValgfrieFelt" />
                        </BodyShort>
                        <BlueRadioGroup
                            name="type"
                            control={formMethods.control}
                            label={intl.formatMessage({
                                id: 'HvemPlanleggerSteg.HvemPlanlegger',
                            })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'HvemPlanleggerSteg.HvemPlanlegger.Required',
                                    }),
                                ),
                            ]}
                            onChange={scrollToBottom}
                        >
                            <Radio value={HvemPlanleggerType.MOR_OG_FAR} autoFocus>
                                <FormattedMessage id="HvemPlanleggerSteg.MorOgFar" />
                            </Radio>
                            <Radio value={HvemPlanleggerType.MOR_OG_MEDMOR}>
                                <FormattedMessage id="HvemPlanleggerSteg.MorOgMedmor" />
                            </Radio>
                            <Radio value={HvemPlanleggerType.FAR_OG_FAR}>
                                <FormattedMessage id="HvemPlanleggerSteg.FarOgFar" />
                            </Radio>
                            <Radio value={HvemPlanleggerType.MOR}>
                                <FormattedMessage id="HvemPlanleggerSteg.BareMor" />
                            </Radio>
                            <Radio value={HvemPlanleggerType.FAR}>
                                <FormattedMessage id="HvemPlanleggerSteg.BareFar" />
                            </Radio>
                        </BlueRadioGroup>
                        {type && (
                            <BluePanel isDarkBlue={erHvemPlanleggerIkkeOppgittFraFør} shouldFadeIn>
                                <VStack gap="10">
                                    {erMorDelAvSøknadenGittType(type) && (
                                        <RhfTextField
                                            name="navnPåMor"
                                            control={formMethods.control}
                                            label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Mor' })}
                                            customErrorFormatter={formatError}
                                        />
                                    )}
                                    {erFarDelAvSøknadenGittType(type) && (
                                        <RhfTextField
                                            name="navnPåFar"
                                            control={formMethods.control}
                                            label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Far' })}
                                            customErrorFormatter={formatError}
                                        />
                                    )}
                                    {type === HvemPlanleggerType.MOR_OG_MEDMOR && (
                                        <RhfTextField
                                            name="navnPåMedmor"
                                            control={formMethods.control}
                                            label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Medmor' })}
                                            customErrorFormatter={formatError}
                                        />
                                    )}
                                    {type === HvemPlanleggerType.FAR_OG_FAR && (
                                        <RhfTextField
                                            name="navnPåMedfar"
                                            control={formMethods.control}
                                            label={intl.formatMessage({ id: 'HvemPlanleggerSteg.Far' })}
                                            customErrorFormatter={formatError}
                                        />
                                    )}
                                </VStack>
                            </BluePanel>
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} useSimplifiedTexts />
                </VStack>
            </RhfForm>
        </PlanleggerStepPage>
    );
};
