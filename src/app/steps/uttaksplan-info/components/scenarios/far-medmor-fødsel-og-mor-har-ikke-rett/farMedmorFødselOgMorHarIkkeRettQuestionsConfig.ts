import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';

interface FarMedmorFødselOgMorHarIkkeRettQuestionsPayload extends FarMedmorFødselOgMorHarIkkeRettFormData {
    erMorUfør: boolean;
}

const FarMedmorFødselOgMorHarIkkeRettFormConfig: QuestionConfig<
    FarMedmorFødselOgMorHarIkkeRettQuestionsPayload,
    FarMedmorFødselOgMorHarIkkeRettFormField
> = {
    [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
    },
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: ({ dekningsgrad, erMorUfør }) => hasValue(dekningsgrad) && erMorUfør,
    },
};

export const farMedmorFødselOgMorHarIkkeRettQuestionsConfig = Questions<
    FarMedmorFødselOgMorHarIkkeRettQuestionsPayload,
    FarMedmorFødselOgMorHarIkkeRettFormField
>(FarMedmorFødselOgMorHarIkkeRettFormConfig);
