import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Questions, QuestionConfig } from '@navikt/sif-common-question-config/lib';
import { SelectableBarn } from './components/barnVelger/BarnVelger';

export enum VelkommenFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    gjelderAnnetBarn = 'gjelderAnnetBarn',
    valgteBarn = 'valgteBarn',
}

export interface VelkommenFormData {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormField.gjelderAnnetBarn]: false;
    [VelkommenFormField.valgteBarn]: SelectableBarn | undefined;
}

export const getInitialVelkommenValues = (harForståttRettigheterOgPlikter: boolean): VelkommenFormData => ({
    [VelkommenFormField.harForståttRettigheterOgPlikter]: harForståttRettigheterOgPlikter,
    [VelkommenFormField.gjelderAnnetBarn]: false,
    [VelkommenFormField.valgteBarn]: undefined,
});

interface VelkommenQuestionsPayload extends VelkommenFormData {
    selectableBarn: SelectableBarn[];
}

export const VelkommenFormConfig: QuestionConfig<VelkommenQuestionsPayload, VelkommenFormField> = {
    [VelkommenFormField.valgteBarn]: {
        isIncluded: ({ selectableBarn }) => selectableBarn.length > 0,
        isAnswered: ({ valgteBarn, gjelderAnnetBarn }) => valgteBarn !== undefined || gjelderAnnetBarn,
        visibilityFilter: ({ selectableBarn }) => selectableBarn.length > 0,
    },
    [VelkommenFormField.gjelderAnnetBarn]: {
        isIncluded: () => true,
        isAnswered: ({ valgteBarn, gjelderAnnetBarn }) => valgteBarn !== undefined || gjelderAnnetBarn,
    },
    [VelkommenFormField.harForståttRettigheterOgPlikter]: {
        isAnswered: ({ harForståttRettigheterOgPlikter }) => harForståttRettigheterOgPlikter === true,
        isIncluded: ({ valgteBarn, gjelderAnnetBarn, selectableBarn }) =>
            valgteBarn !== undefined || gjelderAnnetBarn || selectableBarn.length === 0,
    },
};

export const VelkommenFormComponents = getTypedFormComponents<VelkommenFormField, VelkommenFormData, string>();

export const velkommenFormQuestions = Questions<VelkommenQuestionsPayload, VelkommenFormField>(VelkommenFormConfig);
