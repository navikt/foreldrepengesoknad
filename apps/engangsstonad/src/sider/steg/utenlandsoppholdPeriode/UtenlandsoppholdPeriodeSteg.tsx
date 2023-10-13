import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';

import { Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import UtenlandsoppholdPeriodePanel from './UtenlandsoppholdPeriodePanel';
import useEsNavigator from 'appData/useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import { UtenlandsoppholdPerioder, Periode } from 'types/Utenlandsopphold';
import useStepData from 'appData/useStepData';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as Periode;

const DEFAULT_FORM_VALUES = {
    perioder: [DEFAULT_PERIODE],
} as UtenlandsoppholdPerioder;

const UtenlandsoppholdPeriodeSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();
    const utenlandsoppholdPerioder = useEsStateData(EsDataType.UTENLANDSOPPHOLD_PERIODER);
    const lagreUtenlandsoppholdPerioder = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_PERIODER);

    const defaultValues = useMemo(() => utenlandsoppholdPerioder || DEFAULT_FORM_VALUES, []);
    const formMethods = useForm<UtenlandsoppholdPerioder>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'perioder',
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

    const lagre = useCallback((formValues: UtenlandsoppholdPerioder) => {
        lagreUtenlandsoppholdPerioder(formValues);
        navigator.goToNextDefaultStep();
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            pageTitle={intl.formatMessage({ id: 'UtenlandsoppholdPeriodeSteg.Title' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {fields.map((field, index) => (
                        <UtenlandsoppholdPeriodePanel key={field.id} index={index} fjernOpphold={fjernOpphold} />
                    ))}
                    <HStack>
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            icon={<PlusIcon aria-hidden />}
                            onClick={leggTilOpphold}
                        >
                            <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                        </Button>
                    </HStack>
                    <StepButtonsHookForm<UtenlandsoppholdPerioder>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreUtenlandsoppholdPerioder}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default UtenlandsoppholdPeriodeSteg;
