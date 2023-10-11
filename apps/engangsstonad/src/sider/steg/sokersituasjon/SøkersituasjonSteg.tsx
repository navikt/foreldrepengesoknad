import { useCallback } from 'react';
import { Radio, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';

import { RadioGroupPanel, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired } from 'fpcommon/validering/valideringsregler';
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
    const lagreOmBarnet = useEsStateSaveFn(EsDataType.OM_BARNET);

    const formMethods = useForm<Søkersituasjon>({
        defaultValues: søkersituasjon,
    });

    const lagre = useCallback((formValues: Søkersituasjon) => {
        lagreSøkersituasjon(formValues);
        if (søkersituasjon && søkersituasjon.situasjon !== formValues.situasjon) {
            lagreOmBarnet(undefined);
        }
        navigator.goToNextDefaultStep();
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            pageTitle={intl.formatMessage({ id: 'SøkersituasjonSteg.Søkersituasjon' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroupPanel
                        name="situasjon"
                        label={<FormattedMessage id="SøkersituasjonSteg.Situasjon" />}
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon' }),
                            ),
                        ]}
                    >
                        <Radio value={SøkersituasjonEnum.FØDSEL}>
                            <FormattedMessage id="SøkersituasjonSteg.Fødsel" />
                        </Radio>
                        <Radio value={SøkersituasjonEnum.ADOPSJON}>
                            <FormattedMessage id="SøkersituasjonSteg.Adopsjon" />
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
