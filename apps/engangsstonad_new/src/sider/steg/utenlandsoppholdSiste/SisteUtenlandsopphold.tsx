import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import SisteUtenlandsoppholdPeriode from './SisteUtenlandsoppholdPeriode';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import Form from 'fpcommon/form/Form';
import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useStepData from 'appData/useStepData';
import { UtenlandsoppholdSiste, UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;
const DEFAULT_FORM_VALUES = {
    utenlandsoppholdSiste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdSiste;

const SisteUtenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const lagreSisteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SISTE);

    const defaultValues = useMemo(() => sisteUtenlandsopphold || DEFAULT_FORM_VALUES, []);
    const formMethods = useForm<UtenlandsoppholdSiste>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdSiste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append(DEFAULT_PERIODE);
    }, [append]);
    const fjernOpphold = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove],
    );

    const lagre = useCallback((formValues: UtenlandsoppholdSiste) => {
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
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
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
                    <StepButtonsHookForm<UtenlandsoppholdSiste>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreSisteUtenlandsopphold}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SisteUtenlandsopphold;
