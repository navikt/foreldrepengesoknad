import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack, Link } from '@navikt/ds-react';
import { Step, StepButtonWrapper } from '@navikt/fp-common';

import stepConfig, { getPreviousStepHref } from '../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import FremtidigPanel from './FremtidigPanel';

export type FormValues = {
    utenlandsoppholdNeste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

interface OwnProps {
    lagretFremtidigUtenlandsopphold?: FormValues;
    lagreFremtidigUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const FremtidigUtlandsopphold: React.FunctionComponent<OwnProps> = ({
    lagretFremtidigUtenlandsopphold,
    lagreFremtidigUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const defaultValues = useMemo(() => lagretFremtidigUtenlandsopphold || { utenlandsoppholdNeste12Mnd: [{}] }, []);
    const formMethods = useForm<FormValues>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append({});
    }, [append]);
    const fjernOpphold = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove],
    );

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="utenlandsoppholdFremtidig"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.fremtidig' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreFremtidigUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((_field, index) => (
                                <>
                                    <FremtidigPanel index={index} fjernOpphold={fjernOpphold} />
                                    {fields.length > 1 && <hr style={{ width: '100%' }} color="#99C4DD" />}
                                </>
                            ))}
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                icon={<PlusIcon aria-hidden />}
                                onClick={leggTilOpphold}
                            >
                                <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                            </Button>
                        </VStack>
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('utenlandsoppholdFremtidig')}>
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

export default FremtidigUtlandsopphold;
