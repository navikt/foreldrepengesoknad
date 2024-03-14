import { PlusIcon } from '@navikt/aksel-icons';
import { Fragment, useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { HorizontalLine, ProgressStep, Step } from '@navikt/fp-ui';

import UtenlandsoppholdIntlProvider from '../intl/UtenlandsoppholdIntlProvider';
import TidligereUtenlandsoppholdPeriode from './TidligereUtenlandsoppholdPeriode';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdSiste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdTidligere;

export interface Props<TYPE> {
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    saveOnNext: (formValues: UtenlandsoppholdTidligere) => void;
    saveOnPrevious: (data: UtenlandsoppholdTidligere | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

const TidligereUtenlandsoppholdPanel = <TYPE extends string>({
    tidligereUtenlandsopphold,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
}: Props<TYPE>) => {
    const defaultValues = useMemo(() => tidligereUtenlandsopphold || DEFAULT_FORM_VALUES, [tidligereUtenlandsopphold]);
    const formMethods = useForm<UtenlandsoppholdTidligere>({
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

    return (
        <UtenlandsoppholdIntlProvider>
            <Step onCancel={cancelApplication} onContinueLater={onContinueLater} steps={stepConfig}>
                <Form formMethods={formMethods} onSubmit={saveOnNext}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((field, index) => (
                                <Fragment key={field.id}>
                                    <TidligereUtenlandsoppholdPeriode index={index} fjernOpphold={fjernOpphold} />
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
                                <FormattedMessage id="TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand" />
                            </Button>
                        </VStack>
                        <StepButtonsHookForm<UtenlandsoppholdTidligere>
                            goToPreviousStep={goToPreviousStep}
                            saveDataOnPreviousClick={saveOnPrevious}
                        />
                    </VStack>
                </Form>
            </Step>
        </UtenlandsoppholdIntlProvider>
    );
};

export default TidligereUtenlandsoppholdPanel;
