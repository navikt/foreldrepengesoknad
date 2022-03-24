import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';

const FarMedmorFødselBeggeHarRettFormConfig: QuestionConfig<
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField
> = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: {
        isIncluded: () => true,
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: {
        isIncluded: () => true,
        isAnswered: ({ morsSisteDag }) => hasValue(morsSisteDag),
        visibilityFilter: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: {
        isIncluded: ({ morsSisteDag }) => hasValue(morsSisteDag),
        isAnswered: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
    },
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: {
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isAnswered: () => true,
    },
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: {
        isIncluded: ({ farMedmorsFørsteDag }) => hasValue(farMedmorsFørsteDag),
        isAnswered: () => true,
    },
};

const farMedmorFødselBeggeHarRettQuestionsConfig = Questions<
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField
>(FarMedmorFødselBeggeHarRettFormConfig);

export default farMedmorFødselBeggeHarRettQuestionsConfig;
