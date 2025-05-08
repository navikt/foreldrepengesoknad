import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    kjønn: 'M' | 'K';
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const SøkersituasjonSteg = ({ arbeidsforhold, kjønn, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const søkersituasjon = useContextGetData(ContextDataType.SØKERSITUASJON);
    const oppdaterSøkersituasjon = useContextSaveData(ContextDataType.SØKERSITUASJON);

    const formMethods = useForm<SøkersituasjonFp>({
        defaultValues: søkersituasjon
            ? {
                  ...søkersituasjon,
              }
            : undefined,
    });

    const onSubmit = (values: SøkersituasjonFp) => {
        oppdaterSøkersituasjon({
            situasjon: values.situasjon,
            rolle: values.rolle ?? 'far',
        });

        return navigator.goToNextDefaultStep();
    };

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RhfRadioGroup
                        name="situasjon"
                        label={<FormattedMessage id="søkersituasjon.text.situasjon" />}
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'søkersituasjon.validering.oppgiFodselEllerAdopsjon' }),
                            ),
                        ]}
                    >
                        <Radio value="fødsel">
                            <FormattedMessage id="søkersituasjon.radioButton.fødsel" />
                        </Radio>
                        <Radio value="adopsjon">
                            <FormattedMessage id="søkersituasjon.radioButton.adopsjon" />
                        </Radio>
                    </RhfRadioGroup>
                    {kjønn === 'K' && (
                        <RhfRadioGroup
                            name="rolle"
                            label={<FormattedMessage id="søkersituasjon.text.rolle" />}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'søkersituasjon.validering.oppgiHvaDuSokerSom',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value="mor">
                                <FormattedMessage id="søkersituasjon.radioButton.mor" />
                            </Radio>
                            <Radio value="medmor">
                                <FormattedMessage id="søkersituasjon.radioButton.medmor" />
                            </Radio>
                        </RhfRadioGroup>
                    )}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};
