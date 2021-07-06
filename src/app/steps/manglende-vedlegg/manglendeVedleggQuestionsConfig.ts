import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { ManglendeVedleggFormData, ManglendeVedleggFormField } from './manglendeVedleggFormConfig';

const ManglendeVedleggFormConfig: QuestionConfig<ManglendeVedleggFormData, ManglendeVedleggFormField> = {
    [ManglendeVedleggFormField.terminbekreftelseDato]: {
        isAnswered: ({ terminbekreftelseDato }) => hasValue(terminbekreftelseDato),
        isIncluded: () => true,
    },
};

export const manglendeVedleggQuestionsConfig = Questions<ManglendeVedleggFormData, ManglendeVedleggFormField>(
    ManglendeVedleggFormConfig
);
