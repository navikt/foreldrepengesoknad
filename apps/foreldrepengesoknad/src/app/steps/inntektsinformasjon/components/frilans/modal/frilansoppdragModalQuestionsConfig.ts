import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { FrilansoppdragModalFormData, FrilansoppdragModalFormField } from './frilansoppdragModalFormConfig';

const FrilansoppdragModalFormConfig: QuestionConfig<FrilansoppdragModalFormData, FrilansoppdragModalFormField> = {
    [FrilansoppdragModalFormField.navnOppdragsgiver]: {
        isIncluded: () => true,
        isAnswered: ({ navnOppdragsgiver }) => hasValue(navnOppdragsgiver),
    },
    [FrilansoppdragModalFormField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
        visibilityFilter: ({ navnOppdragsgiver }) => hasValue(navnOppdragsgiver),
    },
    [FrilansoppdragModalFormField.pågående]: {
        isIncluded: () => true,
        isAnswered: ({ pågående }) => pågående !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fom }) => hasValue(fom),
    },
    [FrilansoppdragModalFormField.tom]: {
        isIncluded: ({ pågående }) => pågående === YesOrNo.NO,
        isAnswered: ({ tom }) => hasValue(tom),
        visibilityFilter: ({ pågående }) => pågående === YesOrNo.NO,
    },
};

const frilansoppdragModalQuestionsConfig = Questions<FrilansoppdragModalFormData, FrilansoppdragModalFormField>(
    FrilansoppdragModalFormConfig
);

export default frilansoppdragModalQuestionsConfig;
