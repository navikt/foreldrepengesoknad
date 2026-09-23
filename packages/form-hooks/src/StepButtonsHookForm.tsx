import { use, useCallback } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

import { StepButtons } from '@navikt/fp-ui';

import { LagreSkjemautkastContext } from './skjemautkast/Skjemautkast';

interface Props<DATA_TYPE extends FieldValues> {
    goToPreviousStep: () => void;
    saveDataOnPreviousClick?: (data: DATA_TYPE) => void;
    nextButtonOnClick?: () => void;
    onFortsettSenere?: () => void;
    onAvsluttOgSlett?: () => void;
    isDisabledAndLoading?: boolean;
    useSimplifiedTexts?: boolean;
}

export const StepButtonsHookForm = <DATA_TYPE extends FieldValues>({
    goToPreviousStep,
    saveDataOnPreviousClick,
    nextButtonOnClick,
    onFortsettSenere,
    onAvsluttOgSlett,
    isDisabledAndLoading = false,
    useSimplifiedTexts = false,
}: Props<DATA_TYPE>) => {
    const { lagreUtkast, oppdaterUtkast } = use(LagreSkjemautkastContext);
    const {
        getValues,
        formState: { dirtyFields, isSubmitting },
    } = useFormContext<DATA_TYPE>();

    const onBackButtonClick = useCallback(() => {
        oppdaterUtkast?.();
        if (saveDataOnPreviousClick && Object.keys(dirtyFields).length > 0) {
            saveDataOnPreviousClick(getValues());
        }
        goToPreviousStep();
    }, [dirtyFields, getValues, goToPreviousStep, oppdaterUtkast, saveDataOnPreviousClick]);

    return (
        <StepButtons
            onFortsettSenere={
                onFortsettSenere
                    ? () => {
                          lagreUtkast?.();
                          onFortsettSenere();
                      }
                    : undefined
            }
            onAvsluttOgSlett={onAvsluttOgSlett}
            goToPreviousStep={onBackButtonClick}
            nextButtonOnClick={nextButtonOnClick}
            isDisabledAndLoading={isDisabledAndLoading || isSubmitting}
            useSimplifiedTexts={useSimplifiedTexts}
        />
    );
};
