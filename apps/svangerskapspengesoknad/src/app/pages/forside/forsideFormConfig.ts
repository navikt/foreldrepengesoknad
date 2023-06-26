import { Questions, QuestionConfig } from '@navikt/sif-common-question-config/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum ForsideFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface ForsideFormData {
    [ForsideFormField.harForståttRettigheterOgPlikter]: boolean;
}

export const getInitialForsideValues = (harForståttRettigheterOgPlikter: boolean): ForsideFormData => ({
    [ForsideFormField.harForståttRettigheterOgPlikter]: harForståttRettigheterOgPlikter,
});

export const ForsideFormConfig: QuestionConfig<ForsideFormData, ForsideFormField> = {
    [ForsideFormField.harForståttRettigheterOgPlikter]: {
        isAnswered: ({ harForståttRettigheterOgPlikter }) => harForståttRettigheterOgPlikter === true,
    },
};

export const ForsideFormComponents = getTypedFormComponents<ForsideFormField, ForsideFormData, string>();

export const forsideFormQuestions = Questions<ForsideFormData, ForsideFormField>(ForsideFormConfig);
