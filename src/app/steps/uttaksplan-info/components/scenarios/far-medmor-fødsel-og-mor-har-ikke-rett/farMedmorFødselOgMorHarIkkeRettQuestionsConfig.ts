import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';

interface FarMedmorFødselOgMorHarIkkeRettQuestionsPayload extends FarMedmorFødselOgMorHarIkkeRettFormData {
    erMorUfør: boolean;
    familiehendelsesdato: Date;
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
        isIncluded: ({ dekningsgrad, erMorUfør, familiehendelsesdato }) =>
            andreAugust2022ReglerGjelder(familiehendelsesdato) || (hasValue(dekningsgrad) && erMorUfør),
    },
};

export const farMedmorFødselOgMorHarIkkeRettQuestionsConfig = Questions<
    FarMedmorFødselOgMorHarIkkeRettQuestionsPayload,
    FarMedmorFødselOgMorHarIkkeRettFormField
>(FarMedmorFødselOgMorHarIkkeRettFormConfig);
