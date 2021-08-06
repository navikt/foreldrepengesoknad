import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { ManglendeVedleggFormData, ManglendeVedleggFormField } from './manglendeVedleggFormConfig';
import { AttachmentType } from 'app/types/AttachmentType';

interface ManglendeVedleggQuestionsPayload extends ManglendeVedleggFormData {
    manglendeVedleggTyper: AttachmentType[];
}

const ManglendeVedleggFormConfig: QuestionConfig<ManglendeVedleggQuestionsPayload, ManglendeVedleggFormField> = {
    [ManglendeVedleggFormField.vedlegg]: {
        isAnswered: ({ vedlegg, manglendeVedleggTyper }) =>
            manglendeVedleggTyper.every((type) => vedlegg.flat().some((v) => v.type === type)),
        isIncluded: () => true,
    },
};

export const manglendeVedleggQuestionsConfig = Questions<ManglendeVedleggQuestionsPayload, ManglendeVedleggFormField>(
    ManglendeVedleggFormConfig
);
