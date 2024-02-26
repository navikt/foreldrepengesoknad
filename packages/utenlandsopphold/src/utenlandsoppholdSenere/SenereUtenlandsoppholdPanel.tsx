import { PlusIcon } from '@navikt/aksel-icons';
import { Fragment, useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode, UtenlandsoppholdSenere } from '@navikt/fp-types';
import { HorizontalLine, ProgressStep, Step } from '@navikt/fp-ui';

import UtenlandsoppholdIntlProvider from '../intl/UtenlandsoppholdIntlProvider';
import SenereUtenlandsoppholdPeriode from './SenereUtenlandsoppholdPeriode';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdNeste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdSenere;

export interface Props<TYPE> {
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    saveOnNext: (formValues: UtenlandsoppholdSenere) => void;
    saveOnPrevious: (formValues: UtenlandsoppholdSenere | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

const SenereUtenlandsoppholdPanel = <TYPE extends string>({
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    senereUtenlandsopphold,
    stepConfig,
}: Props<TYPE>) => {
    const defaultValues = useMemo(() => senereUtenlandsopphold || DEFAULT_FORM_VALUES, [senereUtenlandsopphold]);
    const formMethods = useForm<UtenlandsoppholdSenere>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append(DEFAULT_PERIODE);
    }, [append]);

    return (
        <UtenlandsoppholdIntlProvider>
            <Step onCancel={cancelApplication} onContinueLater={onContinueLater} steps={stepConfig}>
                <Form formMethods={formMethods} onSubmit={saveOnNext}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((field, index) => (
                                <Fragment key={field.id}>
                                    <SenereUtenlandsoppholdPeriode index={index} fjernOpphold={remove} />
                                    {fields.length > 1 && <HorizontalLine />}
                                </Fragment>
                            ))}
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                icon={<PlusIcon aria-hidden />}
                                onClick={leggTilOpphold}
                            >
                                <FormattedMessage id="SenereUtenlandsoppholdSteg.Knapp.LeggTilLand" />
                            </Button>
                        </VStack>
                        <StepButtonsHookForm<UtenlandsoppholdSenere>
                            goToPreviousStep={goToPreviousStep}
                            saveDataOnPreviousClick={saveOnPrevious}
                        />
                    </VStack>
                </Form>
            </Step>
        </UtenlandsoppholdIntlProvider>
    );
};

export default SenereUtenlandsoppholdPanel;
