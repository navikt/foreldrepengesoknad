import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Link } from '@navikt/ds-react';
import { Block, Kjønn, Step, StepButtonWrapper } from '@navikt/fp-common';

import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import { PageKeys } from '../../PageKeys';
import { FormValues as SøkersituasjonFormValues, Søkersituasjon } from '../sokersituasjon/SøkersituasjonForm';
import FødtPanel, { FormValues as FødtFormValues } from './FødtPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';

import './omBarnet.less';

export type FormValues = FødtFormValues & AdopsjonFormValues;

interface Props {
    kjønn: Kjønn;
    søkersituasjon: SøkersituasjonFormValues;
    lagretOmBarnet?: FormValues;
    lagreOmBarnet: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const OmBarnetForm: React.FunctionComponent<Props> = ({
    kjønn,
    søkersituasjon,
    lagretOmBarnet,
    lagreOmBarnet,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.OmBarnet,
    });

    const formMethods = useForm<FormValues>({
        defaultValues: {
            fødselsdatoer: [],
            ...lagretOmBarnet,
        },
    });

    const fodselsdatoer = formMethods.watch('fødselsdatoer');

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="omBarnet"
            pageTitle={intl.formatMessage({ id: 'søknad.omBarnet' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreOmBarnet)}>
                    {søkersituasjon.situasjon === Søkersituasjon.ADOPSJON && <AdopsjonPanel kjønn={kjønn} />}
                    {søkersituasjon.situasjon === Søkersituasjon.FØDSEL && <FødtPanel />}
                    <Block margin="xl" textAlignCenter={true}>
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('omBarnet')}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            {fodselsdatoer && (
                                <Button type="submit">{intl.formatMessage({ id: 'søknad.gåVidere' })}</Button>
                            )}
                        </StepButtonWrapper>
                    </Block>
                </form>
            </FormProvider>
        </Step>
    );
};

export default OmBarnetForm;
