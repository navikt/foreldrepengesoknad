import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Radio, VStack } from '@navikt/ds-react';

import { Step } from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, RadioGroup } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, Kjønn, SøkersituasjonFp } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    kjønn: Kjønn;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const SøkersituasjonSteg: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    kjønn,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        oppdaterSøkersituasjon({
            situasjon: values.situasjon,
            rolle: values.rolle || 'far',
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
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroup
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
                    </RadioGroup>
                    {kjønn === 'K' && (
                        <RadioGroup
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
                        </RadioGroup>
                    )}
                    <HStack justify="center">
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                            <FormattedMessage id="søknad.gåVidere" />
                        </Button>
                    </HStack>
                </VStack>
            </Form>
        </Step>
    );
};

export default SøkersituasjonSteg;
