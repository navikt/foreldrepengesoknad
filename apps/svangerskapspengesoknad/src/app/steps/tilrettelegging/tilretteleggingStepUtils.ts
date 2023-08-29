import { QuestionVisibility } from '@navikt/sif-common-formik-ds/lib';
import { TilretteleggingFormData, TilretteleggingFormField } from './tilretteleggingStepFormConfig';
import { Tilrettelegging } from 'app/types/Tilrettelegging';

const getInitValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.tilrettelagtArbeidFom]: '',
    [TilretteleggingFormField.vedlegg]: [],
});

//TODO: do we need this? Always visible now.
export const cleanupOmTilretteleggingFormData = (
    values: TilretteleggingFormData,
    visibility: QuestionVisibility<TilretteleggingFormField, undefined>
): TilretteleggingFormData => {
    const cleanedData: TilretteleggingFormData = {
        tilrettelagtArbeidFom: visibility.isVisible(TilretteleggingFormField.tilrettelagtArbeidFom)
            ? values.tilrettelagtArbeidFom
            : '',
        vedlegg: visibility.isVisible(TilretteleggingFormField.vedlegg) ? values.vedlegg : [],
    };

    return cleanedData;
};

export const getTilretteleggingInitialValues = (
    tilrettelegging: Tilrettelegging[] | undefined
): TilretteleggingFormData => {
    const initialOmTilretteleggingValues = getInitValues();
    console.log(tilrettelegging);
    return {
        ...initialOmTilretteleggingValues,
    };
};

export const mapOmTilretteleggingFormDataToState = (values: Partial<TilretteleggingFormData>): Tilrettelegging[] => {
    //TODO
    console.log(values);
    return [];
};
