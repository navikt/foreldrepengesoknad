import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { SkjemaFormData, SkjemaFormField } from './skjemaFormTypes';
import { hasValue } from '@navikt/fp-common';

const SkjemaFormConfig: QuestionConfig<SkjemaFormData, SkjemaFormField> = {
    [SkjemaFormField.vedlegg]: {
        isAnswered: ({ vedlegg }) => hasValue(vedlegg),
        isIncluded: () => true,
    },
};

export const skjemaFormQuestions = Questions<SkjemaFormData, SkjemaFormField>(SkjemaFormConfig);
