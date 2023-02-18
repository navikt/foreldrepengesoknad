import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

interface MorFødselQuestionsPayload extends MorFødselFormData {
    harRettPåForeldrepengerINorge: boolean | undefined;
    erAleneOmOmsorg: boolean | undefined;
}

const MorFødselFormConfig: QuestionConfig<MorFødselQuestionsPayload, MorFødselFormField> = {
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
        isIncluded: ({ harRettPåForeldrepengerINorge, erAleneOmOmsorg }) =>
            !!harRettPåForeldrepengerINorge && erAleneOmOmsorg === false,
        visibilityFilter: ({ dekningsgrad, permisjonStartdato, skalIkkeHaUttakFørTermin }) =>
            hasValue(dekningsgrad) && (hasValue(permisjonStartdato) || skalIkkeHaUttakFørTermin === true),
    },
};

export const morFødselQuestionsConfig = Questions<MorFødselQuestionsPayload, MorFødselFormField>(MorFødselFormConfig);
