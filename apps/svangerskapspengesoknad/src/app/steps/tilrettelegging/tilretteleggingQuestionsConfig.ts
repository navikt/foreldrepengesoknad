import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { TilretteleggingFormData, TilretteleggingFormField } from './tilretteleggingFormConfig';
import { hasValue } from '@navikt/fp-common';
// import { hasValue } from '@navikt/fp-common';

const TilretteleggingFormConfig: QuestionConfig<TilretteleggingFormData, TilretteleggingFormField> = {
    [TilretteleggingFormField.tilrettelagtArbeidFom]: {
        isIncluded: () => true,
        isAnswered: ({ tilrettelagtArbeidFom }) => tilrettelagtArbeidFom !== YesOrNo.UNANSWERED,
    },
    [TilretteleggingFormField.tilretteleggingsType]: {
        isIncluded: () => true,
        isAnswered: ({ tilretteleggingsType }) => hasValue(tilretteleggingsType),
    },
};

const tilretteleggingQuestionsConfig = Questions<TilretteleggingFormData, TilretteleggingFormField>(
    TilretteleggingFormConfig
);

export default tilretteleggingQuestionsConfig;
