import { PlusIcon } from '@navikt/aksel-icons';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { CountryCode, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { HorizontalLine, ProgressStep, Step } from '@navikt/fp-ui';

import { TidligereUtenlandsoppholdPeriode } from './TidligereUtenlandsoppholdPeriode';

type FormType = {
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
};

const DEFAULT_PERIODE: UtenlandsoppholdPeriode = {
    fom: '',
    tom: '',
    landkode: '' as CountryCode,
};

interface Props<TYPE> {
    tidligereUtenlandsopphold: UtenlandsoppholdPeriode[];
    saveOnNext: (formValues: UtenlandsoppholdPeriode[]) => void;
    saveOnPrevious: (data: UtenlandsoppholdPeriode[]) => void;
    onStepChange?: (id: TYPE) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

export const TidligereUtenlandsoppholdPanel = <TYPE extends string>({
    tidligereUtenlandsopphold,
    saveOnNext,
    saveOnPrevious,
    onAvsluttOgSlett,
    onFortsettSenere,
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

    const leggTilOpphold = () => {
        append(DEFAULT_PERIODE);
    };
    const fjernOpphold = (index: number) => {
        remove(index);
    };

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm formMethods={formMethods} onSubmit={(values) => saveOnNext(values.utenlandsoppholdSiste12Mnd)}>
                <VStack gap="space-40">
                    <ErrorSummaryHookForm />
                    <VStack gap="space-40" align="start">
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
                        onAvsluttOgSlett={onAvsluttOgSlett}
                        onFortsettSenere={onFortsettSenere}
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={(values) => saveOnPrevious(values.utenlandsoppholdSiste12Mnd)}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
