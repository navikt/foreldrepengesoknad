import { useCallback } from 'react';
import { Radio, VStack } from '@navikt/ds-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import { Søkersituasjon, SøkersituasjonEnum } from 'types/Søkersituasjon';
import { isRequired } from 'fpcommon/validering/valideringsregler';
import StepButtons from 'fpcommon/components/StepButtons';
import stepConfig from '../../../stepConfig';
import useEsNavigator from '../../../useEsNavigator';
import { EsDataType, useStateData, useStateSaveFn } from '../../../EsDataContext';

type FormValues = Søkersituasjon;

const SøkersituasjonSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const navigator = useEsNavigator();
    const søkersituasjon = useStateData(EsDataType.SØKERSITUASJON);
    const lagreSøkersituasjon = useStateSaveFn(EsDataType.SØKERSITUASJON);

    const formMethods = useForm<FormValues>({
        defaultValues: søkersituasjon,
    });

    const lagre = useCallback((formValues: FormValues) => {
        lagreSøkersituasjon(formValues);
        navigator.goToNextDefaultStep();
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="søkersituasjon"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagre)}>
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
                        <StepButtons goToPreviousStep={navigator.goToPreviousDefaultStep} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SøkersituasjonSteg;
