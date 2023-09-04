import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, Step, StepButtonWrapper } from '@navikt/fp-common';
import { Link, Button } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import { PageKeys } from '../../PageKeys';
import TidligereBosted, { FormValues as TidligereFormValues } from './TidligereBosted';
import FremtidigBosted, { FormValues as FremtidigFormValues } from './FremtidigBosted';

export type FormValues = TidligereFormValues & FremtidigFormValues;

interface OwnProps {
    lagretUtenlandsopphold?: FormValues;
    lagreUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const UtenlandsoppholdForm: React.FunctionComponent<OwnProps> = ({
    lagretUtenlandsopphold,
    lagreUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Utenlandsopphold,
    });

    const formMethods = useForm<FormValues>({
        defaultValues: lagretUtenlandsopphold,
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="utenlandsopphold"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreUtenlandsopphold)}>
                    <FremtidigBosted />
                    <TidligereBosted />
                    <Block margin="xl">
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('utenlandsopphold')}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            <Button type="submit">
                                <FormattedMessage id="søknad.gåVidere" />
                            </Button>
                        </StepButtonWrapper>
                    </Block>
                </form>
            </FormProvider>
        </Step>
    );
};

export default UtenlandsoppholdForm;
