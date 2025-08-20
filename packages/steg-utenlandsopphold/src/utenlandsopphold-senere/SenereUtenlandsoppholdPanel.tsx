import { PlusIcon } from '@navikt/aksel-icons';
import { Fragment, useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { CountryCode, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { HorizontalLine, ProgressStep, Step } from '@navikt/fp-ui';

import { SenereUtenlandsoppholdPeriode } from './SenereUtenlandsoppholdPeriode';

type FormType = {
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
};

const DEFAULT_PERIODE: UtenlandsoppholdPeriode = {
    fom: '',
    tom: '',
    landkode: '' as CountryCode,
};

interface Props<TYPE> {
    senereUtenlandsopphold: UtenlandsoppholdPeriode[];
    saveOnNext: (formValues: UtenlandsoppholdPeriode[]) => void;
    saveOnPrevious: (formValues: UtenlandsoppholdPeriode[]) => void;
    onStepChange?: (id: TYPE) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

export const SenereUtenlandsoppholdPanel = <TYPE extends string>({
    saveOnNext,
    saveOnPrevious,
    onStepChange,
    onAvsluttOgSlett,
    onFortsettSenere,
    goToPreviousStep,
    senereUtenlandsopphold,
    stepConfig,
}: Props<TYPE>) => {
    const formMethods = useForm<FormType>({
        defaultValues: {
            utenlandsoppholdNeste12Mnd:
                senereUtenlandsopphold.length === 0 ? [DEFAULT_PERIODE] : senereUtenlandsopphold,
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append(DEFAULT_PERIODE);
    }, [append]);

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm formMethods={formMethods} onSubmit={(values) => saveOnNext(values.utenlandsoppholdNeste12Mnd)}>
                <VStack gap="space-40">
                    <ErrorSummaryHookForm />
                    <VStack gap="space-40" align="start">
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
                    <StepButtonsHookForm<FormType>
                        onAvsluttOgSlett={onAvsluttOgSlett}
                        onFortsettSenere={onFortsettSenere}
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={(values) => saveOnPrevious(values.utenlandsoppholdNeste12Mnd)}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
