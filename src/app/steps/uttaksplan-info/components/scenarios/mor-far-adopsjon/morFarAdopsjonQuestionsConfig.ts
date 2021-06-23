import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

const MorFarAdopsjonFormConfig: QuestionConfig<MorFarAdopsjonFormData, MorFarAdopsjonFormField> = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: {
        isAnswered: ({ harAnnenForelderSøktFP }) => hasValue(harAnnenForelderSøktFP),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFarAdopsjonFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
        isOptional: () => false,
    },
};

export const morFarAdopsjonQuestionsConfig = Questions<MorFarAdopsjonFormData, MorFarAdopsjonFormField>(
    MorFarAdopsjonFormConfig
);
