import { PlusIcon } from '@navikt/aksel-icons';
import { Fragment, useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { HorizontalLine, ProgressStep, Step } from '@navikt/fp-ui';

import TidligereUtenlandsoppholdPeriode from './TidligereUtenlandsoppholdPeriode';

type FormType = {
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
};

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} satisfies UtenlandsoppholdPeriode;

export interface Props<TYPE> {
    tidligereUtenlandsopphold: UtenlandsoppholdPeriode[];
    saveOnNext: (formValues: UtenlandsoppholdPeriode[]) => void;
    saveOnPrevious: (data: UtenlandsoppholdPeriode[]) => void;
    onStepChange?: (id: TYPE) => void;
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
    onStepChange,
    goToPreviousStep,
    stepConfig,
}: Props<TYPE>) => {
    const formMethods = useForm<FormType>({
        defaultValues: {
            utenlandsoppholdSiste12Mnd:
                tidligereUtenlandsopphold.length === 0 ? [DEFAULT_PERIODE] : tidligereUtenlandsopphold,
        },
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
        <Step
            onCancel={cancelApplication}
            onContinueLater={onContinueLater}
            steps={stepConfig}
            onStepChange={onStepChange}
        >
            <RhfForm formMethods={formMethods} onSubmit={(values) => saveOnNext(values.utenlandsoppholdSiste12Mnd)}>
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
                    <StepButtonsHookForm<FormType>
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={(values) => saveOnPrevious(values.utenlandsoppholdSiste12Mnd)}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};

export default TidligereUtenlandsoppholdPanel;
