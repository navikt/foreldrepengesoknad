import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack, Link } from '@navikt/ds-react';
import { Step, StepButtonWrapper } from '@navikt/fp-common';

import stepConfig, { getPreviousStepHref } from '../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import TidligerePanel from './TidligerePanel';

export type FormValues = {
    utenlandsoppholdSiste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

interface OwnProps {
    lagretTidligereUtenlandsopphold?: FormValues;
    lagreTidligereUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const TidligereUtlandsopphold: React.FunctionComponent<OwnProps> = ({
    lagretTidligereUtenlandsopphold,
    lagreTidligereUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const defaultValues = useMemo(() => lagretTidligereUtenlandsopphold || { utenlandsoppholdSiste12Mnd: [{}] }, []);
    const formMethods = useForm<FormValues>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdSiste12Mnd',
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
            activeStepId="utenlandsoppholdTidligere"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.tidligere' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreTidligereUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((_field, index) => (
                                <>
                                    <TidligerePanel index={index} fjernOpphold={fjernOpphold} />
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
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('utenlandsoppholdTidligere')}>
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

export default TidligereUtlandsopphold;
