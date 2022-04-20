import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { ManglendeVedleggFormData, ManglendeVedleggFormField } from './manglendeVedleggFormConfig';
import { AttachmentType } from 'app/types/AttachmentType';

interface ManglendeVedleggQuestionsPayload extends ManglendeVedleggFormData {
    manglendeVedleggTyper: AttachmentType[];
    erLikEllerMindreEnnFireUkerTilUttaketStarter: boolean;
}

const ManglendeVedleggFormConfig: QuestionConfig<ManglendeVedleggQuestionsPayload, ManglendeVedleggFormField> = {
    [ManglendeVedleggFormField.vedlegg]: {
        isAnswered: ({ vedlegg, manglendeVedleggTyper, erLikEllerMindreEnnFireUkerTilUttaketStarter }) =>
            erLikEllerMindreEnnFireUkerTilUttaketStarter
                ? true
                : manglendeVedleggTyper.every((type) =>
                      vedlegg
                          .filter((vedlegg) => !!vedlegg)
                          .flat()
                          .some((v) => v.type === type)
                  ),
        isIncluded: () => true,
    },
};

export const manglendeVedleggQuestionsConfig = Questions<ManglendeVedleggQuestionsPayload, ManglendeVedleggFormField>(
    ManglendeVedleggFormConfig
);
