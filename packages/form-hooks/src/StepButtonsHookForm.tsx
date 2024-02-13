import { FieldValues, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { StepButtons } from '@navikt/fp-ui';

interface Props<DATA_TYPE extends FieldValues> {
    goToPreviousStep: () => void;
    saveDataOnPreviousClick?: (data: DATA_TYPE) => void;
    nextButtonOnClick?: () => void;
    isDisabledAndLoading?: boolean;
}

const StepButtonsHookForm = <DATA_TYPE extends FieldValues>({
    goToPreviousStep,
    saveDataOnPreviousClick,
    nextButtonOnClick,
    isDisabledAndLoading = false,
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
            nextButtonOnClick={nextButtonOnClick}
            isDisabledAndLoading={isDisabledAndLoading || isSubmitting}
        />
    );
};

export default StepButtonsHookForm;
