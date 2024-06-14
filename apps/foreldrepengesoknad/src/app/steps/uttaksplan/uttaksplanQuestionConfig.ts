import { QuestionConfig, Questions, YesOrNo } from '@navikt/fp-formik';

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

const uttaksplanQuestionsConfig = Questions<UttaksplanQuestionPayload, UttaksplanFormField>(UttaksplanFormConfig);

export default uttaksplanQuestionsConfig;
