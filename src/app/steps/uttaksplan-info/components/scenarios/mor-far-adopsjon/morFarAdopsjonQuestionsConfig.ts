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
    [MorFarAdopsjonFormField.startdatoAdopsjon]: {
        isAnswered: ({ startdatoAdopsjon }) => hasValue(startdatoAdopsjon),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: {
        isAnswered: ({ annenStartdatoAdopsjon }) => hasValue(annenStartdatoAdopsjon),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFarAdopsjonFormField.morsSisteDag]: {
        isAnswered: ({ morsSisteDag }) => hasValue(morsSisteDag),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFarAdopsjonFormField.farMedmorsFørsteDag]: {
        isAnswered: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isIncluded: () => true,
        isOptional: () => false,
    },
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: {
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isAnswered: ({ antallDagerFellesperiode }) => hasValue(antallDagerFellesperiode),
    },
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: {
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isAnswered: ({ antallUkerFellesperiode }) => hasValue(antallUkerFellesperiode),
    },
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: () => true,
        isOptional: () => true,
    },
};

export const morFarAdopsjonQuestionsConfig = Questions<MorFarAdopsjonFormData, MorFarAdopsjonFormField>(
    MorFarAdopsjonFormConfig
);
