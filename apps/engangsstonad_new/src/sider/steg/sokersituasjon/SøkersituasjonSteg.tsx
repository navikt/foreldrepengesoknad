import { Radio, VStack } from '@navikt/ds-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import stepConfig from '../../../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import { Søkersituasjon, SøkersituasjonEnum } from 'types/Søkersituasjon';
import { isRequired } from 'fpcommon/validering/valideringsregler';
import StepButtons from 'fpcommon/components/StepButtons';
import useEsNavigator from '../../../useEsNavigator';

type FormValues = Søkersituasjon;

interface OwnProps {
    lagretSøkersituasjon?: Søkersituasjon;
    lagreSøkersituasjon: (data: Søkersituasjon) => void;
}

const SøkersituasjonSteg: React.FunctionComponent<OwnProps> = ({ lagretSøkersituasjon, lagreSøkersituasjon }) => {
    const intl = useIntl();

    const navigator = useEsNavigator();

    const formMethods = useForm<FormValues>({
        defaultValues: lagretSøkersituasjon,
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="søkersituasjon"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreSøkersituasjon)}>
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
                        <StepButtons previousStepHref={navigator.previousStepHref} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SøkersituasjonSteg;
