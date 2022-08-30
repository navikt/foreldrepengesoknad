import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import AdopsjonStartdatoValg from './adopsjonStartdatoValg';

interface MorFarAdopsjonQuestionsPayload extends MorFarAdopsjonFormData {
    harAnnenForeldreRettPåForeldrepengerINorge: boolean | undefined;
    erAleneOmOmsorg: boolean | undefined;
}

const MorFarAdopsjonFormConfig: QuestionConfig<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField> = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: {
        isAnswered: ({ harAnnenForelderSøktFP }) => harAnnenForelderSøktFP !== YesOrNo.UNANSWERED,
        isIncluded: ({ harAnnenForeldreRettPåForeldrepengerINorge: harAnnenForeldreRettPåForeldrepenger }) =>
            !!harAnnenForeldreRettPåForeldrepenger,
    },
    [MorFarAdopsjonFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: ({
            harAnnenForelderSøktFP,
            harAnnenForeldreRettPåForeldrepengerINorge: harAnnenForeldreRettPåForeldrepenger,
        }) => harAnnenForelderSøktFP !== YesOrNo.UNANSWERED || !harAnnenForeldreRettPåForeldrepenger,
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
    [MorFarAdopsjonFormField.annenForeldersSisteDag]: {
        isAnswered: ({ annenForeldersSisteDag }) => hasValue(annenForeldersSisteDag),
        isIncluded: ({ dekningsgrad, harAnnenForelderSøktFP }) =>
            hasValue(dekningsgrad) && harAnnenForelderSøktFP === YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.søkersFørsteDag]: {
        isAnswered: ({ søkersFørsteDag }) => hasValue(søkersFørsteDag),
        isIncluded: ({ annenForeldersSisteDag, harAnnenForelderSøktFP }) =>
            hasValue(annenForeldersSisteDag) && harAnnenForelderSøktFP === YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: {
        isAnswered: ({ antallDagerFellesperiode }) => hasValue(antallDagerFellesperiode),
        isIncluded: ({ søkersFørsteDag }) => hasValue(søkersFørsteDag),
    },
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: {
        isAnswered: ({ antallUkerFellesperiode }) => hasValue(antallUkerFellesperiode),
        isIncluded: ({ søkersFørsteDag }) => hasValue(søkersFørsteDag),
    },
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: {
        isAnswered: ({ fellesperiodeukerMor }) => hasValue(fellesperiodeukerMor),
        isIncluded: ({
            startdatoAdopsjonValg,
            harAnnenForelderSøktFP,
            harAnnenForeldreRettPåForeldrepengerINorge,
            erAleneOmOmsorg,
        }) =>
            startdatoAdopsjonValg !== undefined &&
            harAnnenForelderSøktFP !== YesOrNo.YES &&
            !!harAnnenForeldreRettPåForeldrepengerINorge &&
            erAleneOmOmsorg === false,
    },
};

export const morFarAdopsjonQuestionsConfig = Questions<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField>(
    MorFarAdopsjonFormConfig
);
