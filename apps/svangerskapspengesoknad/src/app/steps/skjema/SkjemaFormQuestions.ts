import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { SkjemaFormData, SkjemaFormField } from './skjemaFormTypes';
import { hasValue } from '@navikt/fp-common';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

export interface SøkersituasjonQuestionsPayload extends SkjemaFormData {
    arbeidsType: Arbeidsforholdstype;
}

const SkjemaFormConfig: QuestionConfig<SøkersituasjonQuestionsPayload, SkjemaFormField> = {
    [SkjemaFormField.vedlegg]: {
        isAnswered: ({ vedlegg }) => hasValue(vedlegg),
        isIncluded: () => true,
    },
};

export const skjemaFormQuestions = Questions<SøkersituasjonQuestionsPayload, SkjemaFormField>(SkjemaFormConfig);
