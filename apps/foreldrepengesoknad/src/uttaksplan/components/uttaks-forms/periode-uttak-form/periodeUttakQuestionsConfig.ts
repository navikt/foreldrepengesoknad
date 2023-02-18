import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';

export interface PeriodeUttakQuestionPayload extends PeriodeUttakFormData {
    situasjon: string;
    rolle: Søkerrolle;
}

const PeriodeUttakFormConfig: QuestionConfig<PeriodeUttakQuestionPayload, PeriodeUttakFormField> = {
    [PeriodeUttakFormField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
    },
    [PeriodeUttakFormField.tom]: {
        isIncluded: () => true,
        isAnswered: ({ tom }) => hasValue(tom),
    },
    [PeriodeUttakFormField.aktivitetskravMor]: {
        isIncluded: () => true,
        isAnswered: ({ aktivitetskravMor }) => hasValue(aktivitetskravMor),
    },
};

const uttakPeriodeQuestionsConfig = Questions<PeriodeUttakQuestionPayload, PeriodeUttakFormField>(
    PeriodeUttakFormConfig
);

export default uttakPeriodeQuestionsConfig;
