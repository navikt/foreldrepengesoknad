import { FieldValues, useFormContext } from 'react-hook-form';

import { StepButtons } from '@navikt/fp-ui';

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
    const {
        getValues,
        formState: { dirtyFields, isSubmitting },
    } = useFormContext<DATA_TYPE>();

    const onBackButtonClick = () => {
        if (saveDataOnPreviousClick && Object.keys(dirtyFields).length > 0) {
            saveDataOnPreviousClick(getValues());
        }
        goToPreviousStep();
    };

    return (
        <StepButtons
            onFortsettSenere={onFortsettSenere}
            onAvsluttOgSlett={onAvsluttOgSlett}
            goToPreviousStep={onBackButtonClick}
            nextButtonOnClick={nextButtonOnClick}
            isDisabledAndLoading={isDisabledAndLoading || isSubmitting}
            useSimplifiedTexts={useSimplifiedTexts}
        />
    );
};
