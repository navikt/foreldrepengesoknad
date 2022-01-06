import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

const PeriodeUtsettelseFormConfig: QuestionConfig<PeriodeUtsettelseFormData, PeriodeUtsettelseFormField> = {
    [PeriodeUtsettelseFormField.fom]: {
        isAnswered: ({ fom }) => hasValue(fom),
        isIncluded: () => true,
    },
    [PeriodeUtsettelseFormField.tom]: {
        isAnswered: ({ tom }) => hasValue(tom),
        isIncluded: () => true,
    },
    [PeriodeUtsettelseFormField.årsak]: {
        isAnswered: ({ årsak }) => hasValue(årsak),
        isIncluded: () => true,
        visibilityFilter: ({ fom, tom }) => isValidTidsperiode({ fom, tom }),
    },
};

export const periodeUtsettelseFormQuestionsConfig = Questions<PeriodeUtsettelseFormData, PeriodeUtsettelseFormField>(
    PeriodeUtsettelseFormConfig
);
