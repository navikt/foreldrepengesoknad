import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { BoIUtlandetFormData, BoIUtlandetFormField } from './boIUtlandetFormConfig';
import { hasValue } from 'app/utils/validationUtils';

const BoIUtlandetFormConfig: QuestionConfig<BoIUtlandetFormData, BoIUtlandetFormField> = {
    [BoIUtlandetFormField.bostedIUtlandet]: {
        isAnswered: ({ bostedIUtlandet }) => hasValue(bostedIUtlandet),
        isIncluded: () => true,
    },
};

export const bostedUtlandFormQuestionsConfig = Questions<BoIUtlandetFormData, BoIUtlandetFormField>(
    BoIUtlandetFormConfig,
);
