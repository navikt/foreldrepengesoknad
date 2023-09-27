import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { hasValue } from 'app/utils/validationUtils';
import { VelgArbeidFormData, VelgArbeidFormField } from './velgArbeidFormConfig';

const VelgArbeidFormConfig: QuestionConfig<VelgArbeidFormData, VelgArbeidFormField> = {
    [VelgArbeidFormField.arbeidMedTilrettelegging]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidMedTilrettelegging }) => hasValue(arbeidMedTilrettelegging),
    },
};

const velgArbeidFormQuestionsConfig = Questions<VelgArbeidFormData, VelgArbeidFormField>(VelgArbeidFormConfig);

export default velgArbeidFormQuestionsConfig;
