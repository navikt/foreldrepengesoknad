import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

export interface MorFødselQuestionsPayload extends MorFødselFormData {
    harRettPåForeldrepengerINorge: boolean | undefined;
    erAleneOmOmsorg: boolean | undefined;
}

const MorFødselFormConfig: QuestionConfig<MorFødselQuestionsPayload, MorFødselFormField> = {
    [MorFødselFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: () => true,
        visibilityFilter: () => true,
    },
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: {
        isAnswered: ({ skalIkkeHaUttakFørTermin }) => hasValue(skalIkkeHaUttakFørTermin),
        isIncluded: () => true,
        visibilityFilter: () => true,
    },
    [MorFødselFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: ({ harRettPåForeldrepengerINorge, erAleneOmOmsorg }) =>
            !!harRettPåForeldrepengerINorge && erAleneOmOmsorg === false,
        visibilityFilter: ({ permisjonStartdato, skalIkkeHaUttakFørTermin }) =>
            hasValue(permisjonStartdato) || skalIkkeHaUttakFørTermin === true,
    },
};

export const morFødselQuestionsConfig = Questions<MorFødselQuestionsPayload, MorFødselFormField>(MorFødselFormConfig);
