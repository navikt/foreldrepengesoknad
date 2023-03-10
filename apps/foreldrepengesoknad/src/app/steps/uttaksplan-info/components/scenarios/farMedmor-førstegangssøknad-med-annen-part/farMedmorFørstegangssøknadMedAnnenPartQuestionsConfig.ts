import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField,
} from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';

const FarMedmorFørstegangssøknadMedAnnenPartFormConfig: QuestionConfig<
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField
> = {
    [FarMedmorFørstegangssøknadMedAnnenPartFormField.permisjonStartdato]: {
        isIncluded: () => true,
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
    },
};

export const farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig = Questions<
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField
>(FarMedmorFørstegangssøknadMedAnnenPartFormConfig);
