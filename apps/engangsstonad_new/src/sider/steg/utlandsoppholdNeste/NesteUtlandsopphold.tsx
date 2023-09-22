import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import stepConfig, { getPreviousStepHref } from '../../../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import NesteUtenlandsoppholdPanel from './NesteUtenlandsoppholdPanel';
import StepButtons from 'fpcommon/components/StepButtons';

export type FormValues = {
    utenlandsoppholdNeste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

interface OwnProps {
    lagretNesteUtenlandsopphold?: FormValues;
    lagreNesteUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const NesteUtlandsopphold: React.FunctionComponent<OwnProps> = ({
    lagretNesteUtenlandsopphold,
    lagreNesteUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const defaultValues = useMemo(() => lagretNesteUtenlandsopphold || { utenlandsoppholdNeste12Mnd: [{}] }, []);
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
                <form onSubmit={formMethods.handleSubmit(lagreNesteUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((_field, index) => (
                                <>
                                    <NesteUtenlandsoppholdPanel index={index} fjernOpphold={fjernOpphold} />
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
                        <StepButtons previousStepHref={getPreviousStepHref('nesteUtenlandsopphold')} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default NesteUtlandsopphold;
