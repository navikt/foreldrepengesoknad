import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { BostedUtlandSubformData, BostedUtlandSubformField } from './bostedUtlandSubformConfig';
import { hasValue } from 'app/utils/validationUtils';

const BostedUtlandSubformConfig: QuestionConfig<BostedUtlandSubformData, BostedUtlandSubformField> = {
    [BostedUtlandSubformField.land]: {
        isAnswered: ({ land }) => hasValue(land),
        isIncluded: () => true,
    },
    [BostedUtlandSubformField.fom]: {
        isAnswered: ({ fom }) => hasValue(fom),
        isOptional: () => true,
    },
    [BostedUtlandSubformField.tom]: {
        isAnswered: ({ tom }) => hasValue(tom),
        isIncluded: () => true,
    },
};

export const bostedUtlandFormQuestionsConfig = Questions<BostedUtlandSubformData, BostedUtlandSubformField>(
    BostedUtlandSubformConfig
);
