import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Søkersituasjon } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const SøkersituasjonSteg = ({ mellomlagreOgNaviger }: Props) => {
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
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <Step
                onCancel={navigator.avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToNextStep}
                steps={stepConfig}
            >
                <RhfForm formMethods={formMethods} onSubmit={lagre}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <RhfRadioGroup
                            name="situasjon"
                            control={formMethods.control}
                            label={<FormattedMessage id="SøkersituasjonSteg.Situasjon" />}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value="fødsel">
                                <FormattedMessage id="SøkersituasjonSteg.Fødsel" />
                            </Radio>
                            <Radio value="adopsjon">
                                <FormattedMessage id="SøkersituasjonSteg.Adopsjon" />
                            </Radio>
                        </RhfRadioGroup>
                        <StepButtonsHookForm
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={oppdaterSøkersituasjon}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
