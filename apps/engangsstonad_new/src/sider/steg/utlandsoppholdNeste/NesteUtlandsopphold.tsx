import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import NesteUtenlandsoppholdPanel from './NesteUtenlandsoppholdPanel';
import StepButtons from 'fpcommon/components/StepButtons';
import useEsNavigator from '../../../useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from '../../../EsDataContext';

export type FormValues = {
    utenlandsoppholdNeste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

const NesteUtlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();

    const navigator = useEsNavigator();
    const nesteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_NESTE);
    const lagreNesteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_NESTE);

    const defaultValues = useMemo(() => nesteUtenlandsopphold || { utenlandsoppholdNeste12Mnd: [{}] }, []);
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

    const lagre = useCallback((formValues: FormValues) => {
        lagreNesteUtenlandsopphold(formValues);
        navigator.goToNextDefaultStep();
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.fremtidig' })}
            onCancel={navigator.avbrytSøknad}
            steps={navigator.pageInfo.stepConfig}
            activeStepId={navigator.pageInfo.activeStepId}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagre)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((field, index) => (
                                <Fragment key={field.id}>
                                    <NesteUtenlandsoppholdPanel index={index} fjernOpphold={fjernOpphold} />
                                    {fields.length > 1 && <hr style={{ width: '100%' }} color="#99C4DD" />}
                                </Fragment>
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
                        <StepButtons goToPreviousStep={navigator.goToPreviousDefaultStep} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default NesteUtlandsopphold;
