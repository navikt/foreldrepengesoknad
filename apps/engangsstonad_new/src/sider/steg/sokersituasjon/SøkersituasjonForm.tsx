import { Radio, Button, Alert } from '@navikt/ds-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, Step } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import stepConfig from '../stepConfig';

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

    const situasjon = formMethods.watch('situasjon');

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
                    <Block margin="xl" padBottom="xl">
                        <RadioGroupPanel
                            name="situasjon"
                            label={<FormattedMessage id="søkersituasjon.text.situasjon" />}
                        >
                            <Radio value={Søkersituasjon.FØDSEL}>
                                <FormattedMessage id="søkersituasjon.radiobutton.fødsel" />
                            </Radio>
                            <Radio value={Søkersituasjon.ADOPSJON}>
                                <FormattedMessage id="søkersituasjon.radiobutton.adopsjon" />
                            </Radio>
                        </RadioGroupPanel>
                    </Block>
                    {!situasjon && (
                        <Alert variant="info">{intl.formatMessage({ id: 'søknad.footer.spørsmålMåBesvares' })}</Alert>
                    )}
                    {situasjon && (
                        <Block margin="xl">
                            <Button type="submit">
                                <FormattedMessage id="søknad.gåVidere" />
                            </Button>
                        </Block>
                    )}
                </form>
            </FormProvider>
        </Step>
    );
};

export default SøkersituasjonForm;
