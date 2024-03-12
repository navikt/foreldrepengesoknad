import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';

import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import {
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';

const FarMedmorAleneomsorgFødselFormConfig: QuestionConfig<
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField
> = {
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: {
        isIncluded: () => true,
        isAnswered: ({ startPåOmsorgsovertakelse }) => startPåOmsorgsovertakelse !== YesOrNo.UNANSWERED,
        visibilityFilter: () => true,
    },
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: {
        isIncluded: ({ startPåOmsorgsovertakelse }) => startPåOmsorgsovertakelse === YesOrNo.NO,
        isAnswered: ({ startdatoUttak }) => hasValue(startdatoUttak),
        visibilityFilter: ({ startPåOmsorgsovertakelse }) => startPåOmsorgsovertakelse === YesOrNo.NO,
    },
};

const farMedmorAleneomsorgFødselQuestionsConfig = Questions<
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField
>(FarMedmorAleneomsorgFødselFormConfig);

export default farMedmorAleneomsorgFødselQuestionsConfig;
