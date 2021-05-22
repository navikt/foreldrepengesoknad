import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { UtenlandsoppholdFormData, UtenlandsoppholdFieldNames } from './utenlandsoppholdFormTypes';

const UtenlandsoppholdFormConfig: QuestionConfig<UtenlandsoppholdFormData, UtenlandsoppholdFieldNames> = {
    [UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd]: {
        isAnswered: ({ harBoddUtenforNorgeSiste12Mnd }) => harBoddUtenforNorgeSiste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
        visibilityFilter: ({ skalBoUtenforNorgeNeste12Mnd }) => skalBoUtenforNorgeNeste12Mnd !== YesOrNo.UNANSWERED,
    },
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: {
        isAnswered: ({ utenlandsoppholdSiste12Mnd }) => utenlandsoppholdSiste12Mnd.length > 0,
        isOptional: () => true,
        isIncluded: ({ harBoddUtenforNorgeSiste12Mnd }) => harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
    },
    [UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd]: {
        isAnswered: ({ skalBoUtenforNorgeNeste12Mnd }) => skalBoUtenforNorgeNeste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
    },
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: {
        isAnswered: ({ utenlandsoppholdNeste12Mnd }) => utenlandsoppholdNeste12Mnd.length > 0,
        isOptional: () => true,
        isIncluded: ({ skalBoUtenforNorgeNeste12Mnd }) => skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
    },
};

export const utenlandsoppholdFormQuestions = Questions<UtenlandsoppholdFormData, UtenlandsoppholdFieldNames>(
    UtenlandsoppholdFormConfig
);
