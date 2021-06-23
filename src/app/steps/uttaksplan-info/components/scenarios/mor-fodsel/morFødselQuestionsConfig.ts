import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const AnnenForelderFormConfig: QuestionConfig<MorFødselFormData, MorFødselFormField> = {
    [MorFødselFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFødselFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: {
        isAnswered: ({ skalIkkeHaUttakFørTermin }) => hasValue(skalIkkeHaUttakFørTermin),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFødselFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: () => true,
        isOptional: () => true,
    },
};

export const morFødselQuestionsConfig = Questions<MorFødselFormData, MorFødselFormField>(AnnenForelderFormConfig);
