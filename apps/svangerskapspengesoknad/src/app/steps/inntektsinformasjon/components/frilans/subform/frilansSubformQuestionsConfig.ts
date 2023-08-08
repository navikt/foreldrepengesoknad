import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from 'app/utils/validationUtils';
import { FrilansSubformData, FrilansSubformField } from './frilansSubformConfig';

const FrilansSubformConfig: QuestionConfig<FrilansSubformData, FrilansSubformField> = {
    [FrilansSubformField.frilansFom]: {
        isIncluded: () => true,
        isAnswered: ({ frilansFom }) => hasValue(frilansFom),
    },
    [FrilansSubformField.jobberFremdelesSomFrilanser]: {
        isIncluded: () => true,
        isAnswered: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser !== YesOrNo.UNANSWERED,
    },
    [FrilansSubformField.frilansTom]: {
        isIncluded: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser === YesOrNo.NO,
        isAnswered: ({ frilansTom }) => hasValue(frilansTom),
    },
};

const frilansSubformQuestionsConfig = Questions<FrilansSubformData, FrilansSubformField>(FrilansSubformConfig);

export default frilansSubformQuestionsConfig;
