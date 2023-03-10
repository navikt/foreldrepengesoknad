import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { UtenlandsoppholdFormData, UtenlandsoppholdFieldNames } from './utenlandsoppholdFormTypes';

const UtenlandsoppholdFormConfig: QuestionConfig<UtenlandsoppholdFormData, UtenlandsoppholdFieldNames> = {
    [UtenlandsoppholdFieldNames.harBoddINorgeSiste12Mnd]: {
        isAnswered: ({ harBoddINorgeSiste12Mnd }) => harBoddINorgeSiste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
        visibilityFilter: ({ skalBoINorgeNeste12Mnd }) => skalBoINorgeNeste12Mnd !== YesOrNo.UNANSWERED,
    },
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: {
        isAnswered: ({ utenlandsoppholdSiste12Mnd }) => utenlandsoppholdSiste12Mnd.length > 0,
        isOptional: () => true,
        isIncluded: ({ harBoddINorgeSiste12Mnd }) => harBoddINorgeSiste12Mnd === YesOrNo.NO,
    },
    [UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd]: {
        isAnswered: ({ skalBoINorgeNeste12Mnd }) => skalBoINorgeNeste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
    },
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: {
        isAnswered: ({ utenlandsoppholdNeste12Mnd }) => utenlandsoppholdNeste12Mnd.length > 0,
        isOptional: () => true,
        isIncluded: ({ skalBoINorgeNeste12Mnd }) => skalBoINorgeNeste12Mnd === YesOrNo.NO,
    },
};

export const utenlandsoppholdFormQuestions = Questions<UtenlandsoppholdFormData, UtenlandsoppholdFieldNames>(
    UtenlandsoppholdFormConfig
);
