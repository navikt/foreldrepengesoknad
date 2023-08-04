import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { UtenlandsoppholdFormData, UtenlandsoppholdField } from './utenlandsoppholdFormTypes';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

const UtenlandsoppholdFormConfig: QuestionConfig<UtenlandsoppholdFormData, UtenlandsoppholdField> = {
    [UtenlandsoppholdField.harBoddINorgeSiste12Mnd]: {
        isAnswered: ({ harBoddINorgeSiste12Mnd }) => harBoddINorgeSiste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
    },
    [UtenlandsoppholdField.skalBoINorgeNeste12Mnd]: {
        isAnswered: ({ skalBoINorgeNeste12Mnd }) => skalBoINorgeNeste12Mnd !== YesOrNo.UNANSWERED,
        isIncluded: () => true,
    },
};

export const utenlandsoppholdFormQuestions = Questions<UtenlandsoppholdFormData, UtenlandsoppholdField>(
    UtenlandsoppholdFormConfig
);
