import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from 'app/utils/validationUtils';
import { ArbeidIUtlandetSubformData, ArbeidIUtlandetSubformField } from './arbeidIUtlandetSubformConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

const ArbeidIUtlandetSubformConfig: QuestionConfig<ArbeidIUtlandetSubformData, ArbeidIUtlandetSubformField> = {
    [ArbeidIUtlandetSubformField.arbeidIUtlandetLand]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetLand }) => hasValue(arbeidIUtlandetLand),
    },
    [ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetNavnArbeidsgiver }) => hasValue(arbeidIUtlandetNavnArbeidsgiver),
    },
    [ArbeidIUtlandetSubformField.arbeidIUtlandetFom]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetFom }) => hasValue(arbeidIUtlandetFom),
    },
    [ArbeidIUtlandetSubformField.arbeidIUtlandetErPågående]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetErPågående }) => arbeidIUtlandetErPågående !== YesOrNo.UNANSWERED,
    },
    [ArbeidIUtlandetSubformField.arbeidIUtlandetTom]: {
        isIncluded: ({ arbeidIUtlandetErPågående }) => arbeidIUtlandetErPågående === YesOrNo.NO,
        isAnswered: ({ arbeidIUtlandetTom }) => hasValue(arbeidIUtlandetTom),
    },
};

export const arbeidIUtlandetSubformQuestionsConfig = Questions<ArbeidIUtlandetSubformData, ArbeidIUtlandetSubformField>(
    ArbeidIUtlandetSubformConfig
);
