import { Radio, Button, VStack, Link, ErrorSummary } from '@navikt/ds-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step, StepButtonWrapper } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
}

export type FormValues = {
    situasjon?: Søkersituasjon;
};

interface OwnProps {
    lagretSøkersituasjon?: FormValues;
    lagreSøkersituasjon: (data: FormValues) => void;
    avbrytSøknad: () => void;
    gåTilForrige: () => void;
}

const SøkersituasjonForm: React.FunctionComponent<OwnProps> = ({
    lagretSøkersituasjon,
    lagreSøkersituasjon,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const formMethods = useForm<FormValues>({
        defaultValues: lagretSøkersituasjon,
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="søkersituasjon"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={avbrytSøknad}
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
                                (verdi) =>
                                    verdi === undefined
                                        ? intl.formatMessage({ id: 'SøkersituasjonForm.OppgiFodselEllerAdopsjon' })
                                        : null,
                            ]}
                        >
                            <Radio value={Søkersituasjon.FØDSEL}>
                                <FormattedMessage id="søkersituasjon.radiobutton.fødsel" />
                            </Radio>
                            <Radio value={Søkersituasjon.ADOPSJON}>
                                <FormattedMessage id="søkersituasjon.radiobutton.adopsjon" />
                            </Radio>
                        </RadioGroupPanel>
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('søkersituasjon')}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            <Button type="submit">
                                <FormattedMessage id="søknad.gåVidere" />
                            </Button>
                        </StepButtonWrapper>
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SøkersituasjonForm;
