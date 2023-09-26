import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import stepConfig from '../../../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import SisteUtenlandsoppholdPeriode from './SisteUtenlandsoppholdPeriode';
import StepButtons from 'fpcommon/components/StepButtons';
import useEsNavigator, { Path } from '../../../useEsNavigator';
import { EsDataType, useStateData, useStateSaveFn } from '../../../EsDataContext';

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

    const utenlandsopphold = useStateData(EsDataType.UTENLANDSOPPHOLD);
    const sisteUtenlandsopphold = useStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const lagreSisteUtenlandsopphold = useStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SISTE);

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
        navigator.goToNextDefaultStep();
    }, []);

    const goToPreviousStep = useCallback(() => {
        navigator.goToPreviousStep(
            utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd ? Path.NESTE_UTENLANDSOPPHOLD : Path.UTENLANDSOPPHOLD,
        );
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="sisteUtenlandsopphold"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.tidligere' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
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
                        <StepButtons goToPreviousStep={goToPreviousStep} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default SisteUtlandsopphold;
