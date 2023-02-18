import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Questions, QuestionConfig } from '@navikt/sif-common-question-config/lib';
import { SelectableBarn } from './components/barnVelger/BarnVelger';

export enum VelkommenFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    valgteBarn = 'valgteBarn',
}

export interface VelkommenFormData {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormField.valgteBarn]: string | undefined;
}

export const getInitialVelkommenValues = (harForståttRettigheterOgPlikter: boolean): VelkommenFormData => ({
    [VelkommenFormField.harForståttRettigheterOgPlikter]: harForståttRettigheterOgPlikter,
    [VelkommenFormField.valgteBarn]: undefined,
});

interface VelkommenQuestionsPayload extends VelkommenFormData {
    selectableBarn: SelectableBarn[];
}

export const VelkommenFormConfig: QuestionConfig<VelkommenQuestionsPayload, VelkommenFormField> = {
    [VelkommenFormField.valgteBarn]: {
        isIncluded: ({ selectableBarn }) => selectableBarn.length > 0,
        isAnswered: ({ valgteBarn }) => valgteBarn !== undefined,
        visibilityFilter: ({ selectableBarn }) => selectableBarn.length > 0,
    },
    [VelkommenFormField.harForståttRettigheterOgPlikter]: {
        isAnswered: ({ harForståttRettigheterOgPlikter }) => harForståttRettigheterOgPlikter === true,
        isIncluded: ({ valgteBarn, selectableBarn }) => valgteBarn !== undefined || selectableBarn.length === 0,
    },
};

export const VelkommenFormComponents = getTypedFormComponents<VelkommenFormField, VelkommenFormData, string>();

export const velkommenFormQuestions = Questions<VelkommenQuestionsPayload, VelkommenFormField>(VelkommenFormConfig);
