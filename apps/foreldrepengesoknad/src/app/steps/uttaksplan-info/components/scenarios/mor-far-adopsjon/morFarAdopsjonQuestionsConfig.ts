import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';

import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import AdopsjonStartdatoValg from './adopsjonStartdatoValg';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

export interface MorFarAdopsjonQuestionsPayload extends MorFarAdopsjonFormData {
    harAnnenForelderRettPåForeldrepengerINorge: boolean | undefined;
    erAleneOmOmsorg: boolean | undefined;
}

const MorFarAdopsjonFormConfig: QuestionConfig<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField> = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: {
        isAnswered: ({ harAnnenForelderSøktFP }) => harAnnenForelderSøktFP !== YesOrNo.UNANSWERED,
        isIncluded: ({ harAnnenForelderRettPåForeldrepengerINorge }) => !!harAnnenForelderRettPåForeldrepengerINorge,
    },
    [MorFarAdopsjonFormField.startdatoAdopsjonValg]: {
        isAnswered: ({ startdatoAdopsjonValg }) => hasValue(startdatoAdopsjonValg),
        isIncluded: ({ harAnnenForelderSøktFP }) => harAnnenForelderSøktFP !== YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: {
        isAnswered: ({ annenStartdatoAdopsjon }) => hasValue(annenStartdatoAdopsjon),
        isIncluded: ({ harAnnenForelderSøktFP, startdatoAdopsjonValg }) =>
            startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN && harAnnenForelderSøktFP !== YesOrNo.YES,
    },
    [MorFarAdopsjonFormField.annenForeldersSisteDag]: {
        isAnswered: ({ annenForeldersSisteDag }) => hasValue(annenForeldersSisteDag),
        isIncluded: ({ harAnnenForelderSøktFP }) => harAnnenForelderSøktFP === YesOrNo.YES,
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
            harAnnenForelderRettPåForeldrepengerINorge,
            erAleneOmOmsorg,
        }) =>
            startdatoAdopsjonValg !== undefined &&
            harAnnenForelderSøktFP !== YesOrNo.YES &&
            !!harAnnenForelderRettPåForeldrepengerINorge &&
            erAleneOmOmsorg === false,
    },
};

export const morFarAdopsjonQuestionsConfig = Questions<MorFarAdopsjonQuestionsPayload, MorFarAdopsjonFormField>(
    MorFarAdopsjonFormConfig,
);
