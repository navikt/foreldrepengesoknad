import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { BostedUtlandFormData, BostedUtlandFormField } from './bostedUtlandFormTypes';
import { hasValue } from 'app/utils/validationUtils';

const BostedUtlandSubformConfig: QuestionConfig<BostedUtlandFormData, BostedUtlandFormField> = {
    [BostedUtlandFormField.land]: {
        isAnswered: ({ land }) => hasValue(land),
        isIncluded: () => true,
    },
    [BostedUtlandFormField.fom]: {
        isAnswered: ({ fom }) => hasValue(fom),
        isOptional: () => true,
    },
    [BostedUtlandFormField.tom]: {
        isAnswered: ({ tom }) => hasValue(tom),
        isIncluded: () => true,
    },
};

export const bostedUtlandFormQuestionsConfig = Questions<BostedUtlandFormData, BostedUtlandFormField>(
    BostedUtlandSubformConfig
);
