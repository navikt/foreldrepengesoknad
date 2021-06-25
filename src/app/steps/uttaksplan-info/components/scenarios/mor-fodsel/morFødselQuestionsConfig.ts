import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const MorFødselFormConfig: QuestionConfig<MorFødselFormData, MorFødselFormField> = {
    [MorFødselFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
    },
    [MorFødselFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: () => true,
        visibilityFilter: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: {
        isAnswered: ({ skalIkkeHaUttakFørTermin }) => hasValue(skalIkkeHaUttakFørTermin),
        isIncluded: () => true,
        visibilityFilter: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [MorFødselFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: () => true,
        visibilityFilter: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
};

export const morFødselQuestionsConfig = Questions<MorFødselFormData, MorFødselFormField>(MorFødselFormConfig);
