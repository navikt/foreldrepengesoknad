import { useCallback } from 'react';
import { Radio, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { useCustomIntl } from '@navikt/fp-ui';
import { RadioGroup, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import { Søkersituasjon, SøkersituasjonEnum } from '@navikt/fp-types';

const SøkersituasjonSteg: React.FunctionComponent = () => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator();

    const søkersituasjon = useEsStateData(EsDataType.SØKERSITUASJON);
    const lagreSøkersituasjon = useEsStateSaveFn(EsDataType.SØKERSITUASJON);
    const lagreOmBarnet = useEsStateSaveFn(EsDataType.OM_BARNET);

    const formMethods = useForm<Søkersituasjon>({
        defaultValues: søkersituasjon,
    });

    const lagre = useCallback(
        (formValues: Søkersituasjon) => {
            lagreSøkersituasjon(formValues);
            if (søkersituasjon && søkersituasjon.situasjon !== formValues.situasjon) {
                lagreOmBarnet(undefined);
            }
            navigator.goToNextDefaultStep();
        },
        [lagreOmBarnet, lagreSøkersituasjon, navigator, søkersituasjon],
    );

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroup
                        name="situasjon"
                        label={<FormattedMessage id="SøkersituasjonSteg.Situasjon" />}
                        validate={[isRequired(i18n('SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon'))]}
                    >
                        <Radio value={SøkersituasjonEnum.FØDSEL}>
                            <FormattedMessage id="SøkersituasjonSteg.Fødsel" />
                        </Radio>
                        <Radio value={SøkersituasjonEnum.ADOPSJON}>
                            <FormattedMessage id="SøkersituasjonSteg.Adopsjon" />
                        </Radio>
                    </RadioGroup>
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
