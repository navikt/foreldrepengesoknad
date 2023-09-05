import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import {
    TilretteleggingFormData,
    TilretteleggingFormField,
    TilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

export const TilretteleggingFormConfig: QuestionConfig<TilretteleggingFormData, TilretteleggingFormField> = {
    [TilretteleggingFormField.tilrettelagtArbeidFom]: {
        isIncluded: () => true,
        isAnswered: ({ tilrettelagtArbeidFom }) => tilrettelagtArbeidFom !== YesOrNo.UNANSWERED,
    },
    [TilretteleggingFormField.tilretteleggingPeriodetype]: {
        isIncluded: () => true,
        isAnswered: ({ tilretteleggingPeriodetype }) => hasValue(tilretteleggingPeriodetype),
    },
    [TilretteleggingFormField.tilrettelagtArbeidType]: {
        isIncluded: () => true,
        isAnswered: ({ tilrettelagtArbeidType }) => hasValue(tilrettelagtArbeidType),
    },
    [TilretteleggingFormField.stillingsprosent]: {
        isIncluded: ({ tilrettelagtArbeidType, tilretteleggingPeriodetype }) =>
            hasValue(tilrettelagtArbeidType) &&
            tilrettelagtArbeidType === Tilretteleggingstype.DELVIS &&
            hasValue(tilretteleggingPeriodetype) &&
            tilretteleggingPeriodetype === TilretteleggingPeriodeType.EN,
        isAnswered: ({ stillingsprosent }) => hasValue(stillingsprosent),
    },
    // [TilretteleggingFormField.tilretteleggingsFom]: {
    //     isIncluded: () => true,
    //     isAnswered: ({ tilretteleggingsFom }) => hasValue(tilretteleggingsFom),
    // },
    // [TilretteleggingFormField.tilretteleggingsTom]: {
    //     isIncluded: () => true,
    //     isAnswered: ({ tilretteleggingsTom }) => hasValue(tilretteleggingsTom),
    // },
};

const tilretteleggingQuestionsConfig = Questions<TilretteleggingFormData, TilretteleggingFormField>(
    TilretteleggingFormConfig
);

export default tilretteleggingQuestionsConfig;
