import { Radio, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { useCustomIntl } from '@navikt/fp-ui';
import { RadioGroup, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { Søkersituasjon } from '@navikt/fp-types';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const SøkersituasjonSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const søkersituasjon = useContextGetData(ContextDataType.SØKERSITUASJON);
    const oppdaterSøkersituasjon = useContextSaveData(ContextDataType.SØKERSITUASJON);
    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const formMethods = useForm<Søkersituasjon>({
        defaultValues: søkersituasjon,
    });

    const lagre = (formValues: Søkersituasjon) => {
        oppdaterSøkersituasjon(formValues);
        if (søkersituasjon && søkersituasjon.situasjon !== formValues.situasjon) {
            oppdaterOmBarnet(undefined);
        }
        return navigator.goToNextDefaultStep();
    };

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            onCancel={navigator.avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroup
                        name="situasjon"
                        label={<FormattedMessage id="SøkersituasjonSteg.Situasjon" />}
                        validate={[isRequired(i18n('SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon'))]}
                    >
                        <Radio value="fødsel">
                            <FormattedMessage id="SøkersituasjonSteg.Fødsel" />
                        </Radio>
                        <Radio value="adopsjon">
                            <FormattedMessage id="SøkersituasjonSteg.Adopsjon" />
                        </Radio>
                    </RadioGroup>
                    <StepButtonsHookForm
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={oppdaterSøkersituasjon}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SøkersituasjonSteg;
