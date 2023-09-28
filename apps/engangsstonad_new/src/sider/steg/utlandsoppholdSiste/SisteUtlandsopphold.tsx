import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import SisteUtenlandsoppholdPeriode from './SisteUtenlandsoppholdPeriode';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import useEsNavigator, { Path } from '../../../useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from '../../../EsDataContext';

type FormValues = {
    utenlandsoppholdSiste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

const SisteUtlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();

    const navigator = useEsNavigator();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const lagreSisteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SISTE);

    const defaultValues = useMemo(() => sisteUtenlandsopphold || { utenlandsoppholdSiste12Mnd: [{}] }, []);
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

    const lagre = useCallback((formValues: FormValues) => {
        lagreSisteUtenlandsopphold(formValues);
        navigator.goToNextStep(
            utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd ? Path.NESTE_UTENLANDSOPPHOLD : Path.OPPSUMMERING,
        );
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.tidligere' })}
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
                                    <SisteUtenlandsoppholdPeriode index={index} fjernOpphold={fjernOpphold} />
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
                        <StepButtonsHookForm<FormValues>
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={lagreSisteUtenlandsopphold}
                        />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SisteUtlandsopphold;
