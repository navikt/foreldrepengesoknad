import { useCallback } from 'react';
import { Radio, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import Form from 'fpcommon/form/Form';
import { isRequired } from 'fpcommon/validering/valideringsregler';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import { Søkersituasjon, SøkersituasjonEnum } from 'types/Søkersituasjon';
import useEsNavigator from 'appData/useEsNavigator';
import useStepData from 'appData/useStepData';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';

const SøkersituasjonSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const søkersituasjon = useEsStateData(EsDataType.SØKERSITUASJON);
    const lagreSøkersituasjon = useEsStateSaveFn(EsDataType.SØKERSITUASJON);

    const formMethods = useForm<Søkersituasjon>({
        defaultValues: søkersituasjon,
    });

    const lagre = useCallback((formValues: Søkersituasjon) => {
        lagreSøkersituasjon(formValues);
        navigator.goToNextDefaultStep();
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroupPanel
                        name="situasjon"
                        label={<FormattedMessage id="søkersituasjon.text.situasjon" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'SøkersituasjonForm.OppgiFodselEllerAdopsjon' })),
                        ]}
                    >
                        <Radio value={SøkersituasjonEnum.FØDSEL}>
                            <FormattedMessage id="søkersituasjon.radiobutton.fødsel" />
                        </Radio>
                        <Radio value={SøkersituasjonEnum.ADOPSJON}>
                            <FormattedMessage id="søkersituasjon.radiobutton.adopsjon" />
                        </Radio>
                    </RadioGroupPanel>
                    <StepButtonsHookForm
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreSøkersituasjon}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SøkersituasjonSteg;
