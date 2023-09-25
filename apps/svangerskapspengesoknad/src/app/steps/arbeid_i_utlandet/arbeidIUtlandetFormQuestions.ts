import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from 'app/utils/validationUtils';
import { ArbeidIUtlandetFormData, ArbeidIUtlandetFormField } from './arbeidIUtlandetFormConfig';

const ArbeidIUtlandetFormConfig: QuestionConfig<ArbeidIUtlandetFormData, ArbeidIUtlandetFormField> = {
    [ArbeidIUtlandetFormField.arbeidIUtlandet]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandet }) => hasValue(arbeidIUtlandet),
    },
};

export const arbeidIUtlandetFormQuestionsConfig = Questions<ArbeidIUtlandetFormData, ArbeidIUtlandetFormField>(
    ArbeidIUtlandetFormConfig,
);
