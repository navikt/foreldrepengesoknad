import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import AdopsjonStartdatoValg from './adopsjonStartdatoValg';

interface MorFarAdopsjonQuestionsPayload extends MorFarAdopsjonFormData {
    harAnnenForeldreRettPåForeldrepenger: boolean | undefined;
}

const MorFarAdopsjonFormConfig: QuestionConfig<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField> = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: {
        isAnswered: ({ harAnnenForelderSøktFP }) => hasValue(harAnnenForelderSøktFP),
        isIncluded: ({ harAnnenForeldreRettPåForeldrepenger }) => !!harAnnenForeldreRettPåForeldrepenger,
    },
    [MorFarAdopsjonFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: ({ harAnnenForelderSøktFP, harAnnenForeldreRettPåForeldrepenger }) =>
            harAnnenForelderSøktFP !== YesOrNo.UNANSWERED || !harAnnenForeldreRettPåForeldrepenger,
    },
    [MorFarAdopsjonFormField.startdatoAdopsjonValg]: {
        isAnswered: ({ startdatoAdopsjonValg }) => hasValue(startdatoAdopsjonValg),
        isIncluded: ({ dekningsgrad, harAnnenForelderSøktFP }) =>
            hasValue(dekningsgrad) && harAnnenForelderSøktFP !== YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: {
        isAnswered: ({ annenStartdatoAdopsjon }) => hasValue(annenStartdatoAdopsjon),
        isIncluded: ({ dekningsgrad, harAnnenForelderSøktFP, startdatoAdopsjonValg }) =>
            startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN &&
            hasValue(dekningsgrad) &&
            harAnnenForelderSøktFP !== YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.morsSisteDag]: {
        isAnswered: ({ morsSisteDag }) => hasValue(morsSisteDag),
        isIncluded: ({ dekningsgrad, harAnnenForelderSøktFP }) =>
            hasValue(dekningsgrad) && harAnnenForelderSøktFP === YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.farMedmorsFørsteDag]: {
        isAnswered: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isIncluded: ({ morsSisteDag, harAnnenForelderSøktFP }) =>
            hasValue(morsSisteDag) && harAnnenForelderSøktFP === YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: {
        isAnswered: ({ antallDagerFellesperiode }) => hasValue(antallDagerFellesperiode),
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
    },
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: {
        isAnswered: ({ antallUkerFellesperiode }) => hasValue(antallUkerFellesperiode),
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
    },
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: ({ startdatoAdopsjonValg, harAnnenForelderSøktFP }) =>
            startdatoAdopsjonValg !== undefined && harAnnenForelderSøktFP !== YesOrNo.YES,
    },
};

export const morFarAdopsjonQuestionsConfig = Questions<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField>(
    MorFarAdopsjonFormConfig
);
