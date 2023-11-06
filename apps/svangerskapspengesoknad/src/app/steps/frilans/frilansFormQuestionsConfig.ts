import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from 'app/utils/validationUtils';
import { FrilansFormData, FrilansFormField } from './frilansFormConfig';

const FrilansFormConfig: QuestionConfig<FrilansFormData, FrilansFormField> = {
    [FrilansFormField.frilansFom]: {
        isIncluded: () => true,
        isAnswered: ({ frilansFom }) => hasValue(frilansFom),
    },
    [FrilansFormField.jobberFremdelesSomFrilanser]: {
        isIncluded: () => true,
        isAnswered: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser !== YesOrNo.UNANSWERED,
    },
    // [FrilansFormField.frilansTom]: {
    //     isIncluded: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser === YesOrNo.NO,
    //     isAnswered: ({ frilansTom }) => hasValue(frilansTom),
    // },
};

const frilansSubformQuestionsConfig = Questions<FrilansFormData, FrilansFormField>(FrilansFormConfig);

export default frilansSubformQuestionsConfig;
