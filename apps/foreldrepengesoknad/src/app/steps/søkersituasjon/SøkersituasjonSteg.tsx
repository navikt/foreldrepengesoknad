import { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Button, HStack, Radio, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { isRequired } from '@navikt/fp-validation';
import { Kjønn, SøkersituasjonFp } from '@navikt/fp-types';
import { RadioGroup, Form, ErrorSummaryHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import stepConfig from '../stepsConfig';

type Props = {
    kjønn: Kjønn;
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const SøkersituasjonSteg: React.FunctionComponent<Props> = ({ kjønn, mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = useFpStateData(FpDataType.SØKERSITUASJON);
    const lagreSøkersituasjon = useFpStateSaveFn(FpDataType.SØKERSITUASJON);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const formMethods = useForm<SøkersituasjonFp>({
        defaultValues: søkersituasjon
            ? {
                  ...søkersituasjon,
              }
            : undefined,
    });

    const onSubmit = (values: SøkersituasjonFp) => {
        setIsSubmitting(true);

        lagreSøkersituasjon({
            situasjon: values.situasjon,
            rolle: values.rolle || 'far',
        });
        lagreAppRoute(SøknadRoutes.OM_BARNET);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="søkersituasjon"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, false)}
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
