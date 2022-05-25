import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';

interface FarMedmorFødselBeggeHarRettFormPayload extends FarMedmorFødselBeggeHarRettFormData {
    familiehendelsesdato: Date;
}

const FarMedmorFødselBeggeHarRettFormConfig: QuestionConfig<
    FarMedmorFødselBeggeHarRettFormPayload,
    FarMedmorFødselBeggeHarRettFormField
> = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: {
        isIncluded: () => true,
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: {
        isIncluded: ({ familiehendelsesdato }) => !andreAugust2022ReglerGjelder(familiehendelsesdato),
        isAnswered: ({ morsSisteDag, familiehendelsesdato }) =>
            andreAugust2022ReglerGjelder(familiehendelsesdato) || hasValue(morsSisteDag),
        visibilityFilter: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: {
        isIncluded: ({ morsSisteDag, familiehendelsesdato }) =>
            andreAugust2022ReglerGjelder(familiehendelsesdato) || hasValue(morsSisteDag),
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
    FarMedmorFødselBeggeHarRettFormPayload,
    FarMedmorFødselBeggeHarRettFormField
>(FarMedmorFødselBeggeHarRettFormConfig);

export default farMedmorFødselBeggeHarRettQuestionsConfig;
