import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import stepConfig from '../../../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import SisteUtenlandsoppholdPeriode from './SisteUtenlandsoppholdPeriode';
import StepButtons from 'fpcommon/components/StepButtons';
import useEsNavigator from '../../../useEsNavigator';

export type FormValues = {
    utenlandsoppholdSiste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

interface OwnProps {
    lagretSisteUtenlandsopphold?: FormValues;
    lagreSisteUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const SisteUtlandsopphold: React.FunctionComponent<OwnProps> = ({
    lagretSisteUtenlandsopphold,
    lagreSisteUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const navigator = useEsNavigator();

    const defaultValues = useMemo(() => lagretSisteUtenlandsopphold || { utenlandsoppholdSiste12Mnd: [{}] }, []);
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
                <form onSubmit={formMethods.handleSubmit(lagreSisteUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((_field, index) => (
                                <>
                                    <SisteUtenlandsoppholdPeriode index={index} fjernOpphold={fjernOpphold} />
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
                        <StepButtons previousStepHref={navigator.goToPreviousStep()} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SisteUtlandsopphold;
