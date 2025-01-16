import { QuestionConfig, Questions, YesOrNo } from '@navikt/fp-uttaksplan';

import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';

export interface UttaksplanQuestionPayload extends UttaksplanFormData {
    periodeRundtFødselKanAutomatiskJusteres: boolean;
}

const UttaksplanFormConfig: QuestionConfig<UttaksplanQuestionPayload, UttaksplanFormField> = {
    [UttaksplanFormField.ønskerAutomatiskJustering]: {
        isIncluded: ({ periodeRundtFødselKanAutomatiskJusteres }) => periodeRundtFødselKanAutomatiskJusteres,
        isAnswered: ({ ønskerAutomatiskJustering }) => ønskerAutomatiskJustering !== YesOrNo.UNANSWERED,
    },
};

export const uttaksplanQuestionsConfig = Questions<UttaksplanQuestionPayload, UttaksplanFormField>(
    UttaksplanFormConfig,
);
