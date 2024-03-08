import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { Step } from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Søkersituasjon } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const SøkersituasjonSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const intl = useIntl();

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
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
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
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon' }),
                            ),
                        ]}
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
