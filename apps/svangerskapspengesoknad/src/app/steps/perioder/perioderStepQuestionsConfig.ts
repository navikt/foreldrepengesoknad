import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { hasValue } from 'app/utils/validationUtils';
import { PerioderFormData, PerioderFormField } from './perioderStepFormConfig';

export const PerioderFormConfig: QuestionConfig<PerioderFormData, PerioderFormField> = {
    [PerioderFormField.varierendePerioder]: {
        isIncluded: () => true,
        isAnswered: ({ varierendePerioder }) => hasValue(varierendePerioder),
    },
};

const tilretteleggingQuestionsConfig = Questions<PerioderFormData, PerioderFormField>(PerioderFormConfig);

export default tilretteleggingQuestionsConfig;
