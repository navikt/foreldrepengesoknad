import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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
