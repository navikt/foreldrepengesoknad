import { FieldValues, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { StepButtons } from '@navikt/fp-ui';

interface Props<DATA_TYPE extends FieldValues> {
    goToPreviousStep: () => void;
    saveDataOnPreviousClick?: (data: DATA_TYPE) => void;
    nextButtonText?: string;
    nextButtonOnClick?: (setButtonsDisabled: (isDisabled: boolean) => void) => void;
}

const StepButtonsHookForm = <DATA_TYPE extends FieldValues>({
    goToPreviousStep,
    saveDataOnPreviousClick,
    nextButtonText,
    nextButtonOnClick,
}: Props<DATA_TYPE>) => {
    const {
        getValues,
        formState: { dirtyFields, isSubmitting },
    } = useFormContext<DATA_TYPE>();

    const onBackButtonClick = useCallback(() => {
        if (saveDataOnPreviousClick && Object.keys(dirtyFields).length > 0) {
            saveDataOnPreviousClick(getValues());
        }
        goToPreviousStep();
    }, [dirtyFields, getValues, goToPreviousStep, saveDataOnPreviousClick]);

    return (
        <StepButtons
            goToPreviousStep={onBackButtonClick}
            nextButtonText={nextButtonText}
            nextButtonOnClick={nextButtonOnClick}
            isSubmitting={isSubmitting}
        />
    );
};

export default StepButtonsHookForm;
