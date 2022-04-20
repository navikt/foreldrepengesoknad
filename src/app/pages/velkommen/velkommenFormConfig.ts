import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Questions, QuestionConfig } from '@navikt/sif-common-question-config/lib';

export enum VelkommenFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    vilSøkeOmEndring = 'vilSøkeOmEndring',
}

export interface VelkommenFormData {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormField.vilSøkeOmEndring]: YesOrNo;
}

export const getInitialVelkommenValues = (harForståttRettigheterOgPlikter: boolean): VelkommenFormData => {
    return {
        harForståttRettigheterOgPlikter,
        vilSøkeOmEndring: YesOrNo.UNANSWERED,
    };
};

interface VelkommenQuestionsPayload extends VelkommenFormData {
    sakErAvsluttet: boolean;
}

export const VelkommenFormConfig: QuestionConfig<VelkommenQuestionsPayload, VelkommenFormField> = {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: {
        isAnswered: ({ harForståttRettigheterOgPlikter }) => harForståttRettigheterOgPlikter === true,
        isIncluded: ({ sakErAvsluttet, vilSøkeOmEndring }) =>
            !sakErAvsluttet || vilSøkeOmEndring !== YesOrNo.UNANSWERED,
    },
    [VelkommenFormField.vilSøkeOmEndring]: {
        isAnswered: ({ vilSøkeOmEndring }) => vilSøkeOmEndring !== YesOrNo.UNANSWERED,
        isIncluded: ({ sakErAvsluttet }) => sakErAvsluttet,
    },
};

export const VelkommenFormComponents = getTypedFormComponents<VelkommenFormField, VelkommenFormData, string>();

export const velkommenFormQuestions = Questions<VelkommenQuestionsPayload, VelkommenFormField>(VelkommenFormConfig);
