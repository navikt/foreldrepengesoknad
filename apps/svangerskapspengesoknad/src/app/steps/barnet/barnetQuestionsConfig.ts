import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { BarnetFormData, BarnetFormField } from './barnetFormConfig';
import { hasValue } from '@navikt/fp-common';

const BarnetFormConfig: QuestionConfig<BarnetFormData, BarnetFormField> = {
    [BarnetFormField.erBarnetFødt]: {
        isIncluded: () => true,
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [BarnetFormField.termindato]: {
        isIncluded: () => true,
        isAnswered: ({ termindato }) => hasValue(termindato),
    },
    [BarnetFormField.fødselsdato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
        isAnswered: ({ fødselsdato }) => hasValue(fødselsdato),
    },
};

const barnetQuestionsConfig = Questions<BarnetFormData, BarnetFormField>(BarnetFormConfig);

export default barnetQuestionsConfig;
