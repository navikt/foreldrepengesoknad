import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';

const SøkersituasjonFormConfig: QuestionConfig<
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField
> = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: {
        isIncluded: () => true,
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: {
        isIncluded: () => true,
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: {
        isIncluded: () => true,
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
};

const søkersituasjonQuestionsConfig = Questions<
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField
>(SøkersituasjonFormConfig);

export default søkersituasjonQuestionsConfig;
