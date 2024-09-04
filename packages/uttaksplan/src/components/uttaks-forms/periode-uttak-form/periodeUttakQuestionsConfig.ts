import { Søkerrolle } from '@navikt/fp-common';

import { QuestionConfig, Questions } from '../../../formik-wrappers';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

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
    PeriodeUttakFormConfig,
);

export default uttakPeriodeQuestionsConfig;
