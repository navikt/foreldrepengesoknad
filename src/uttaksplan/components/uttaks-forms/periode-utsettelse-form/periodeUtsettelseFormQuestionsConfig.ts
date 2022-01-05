import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { UttakSkjemaReglerProps } from 'uttaksplan/utils/uttaksskjema/uttakSkjemaregler';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

interface PeriodeUtsettelseFormQuestionsPayload {
    values: PeriodeUtsettelseFormData;
    regelProps: UttakSkjemaReglerProps;
}

const PeriodeUtsettelseFormConfig: QuestionConfig<PeriodeUtsettelseFormQuestionsPayload, PeriodeUtsettelseFormField> = {
    [PeriodeUtsettelseFormField.fom]: {
        isAnswered: ({ values }) => hasValue(values.fom),
        isIncluded: () => true,
    },
    [PeriodeUtsettelseFormField.tom]: {
        isAnswered: ({ values }) => hasValue(values.tom),
        isIncluded: () => true,
    },
    [PeriodeUtsettelseFormField.årsak]: {
        isAnswered: ({ values }) => hasValue(values.årsak),
        isIncluded: () => true,
        visibilityFilter: ({ values }) => isValidTidsperiode({ fom: values.fom, tom: values.tom }),
    },
};

export const periodeUtsettelseFormQuestionsConfig = Questions<
    PeriodeUtsettelseFormQuestionsPayload,
    PeriodeUtsettelseFormField
>(PeriodeUtsettelseFormConfig);
