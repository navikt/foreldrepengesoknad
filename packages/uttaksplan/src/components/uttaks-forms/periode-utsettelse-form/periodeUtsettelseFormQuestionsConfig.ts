import { UtsettelseÅrsakType } from '@navikt/fp-common';
import { isValidTidsperiodeString } from '@navikt/fp-utils';

import { QuestionConfig, Questions } from '../../../formik-wrappers';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export interface PeriodeUtsettelseFormConfigPayload {
    values: PeriodeUtsettelseFormData;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
}

const PeriodeUtsettelseFormConfig: QuestionConfig<PeriodeUtsettelseFormConfigPayload, PeriodeUtsettelseFormField> = {
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
        visibilityFilter: ({ values }) => isValidTidsperiodeString({ fom: values.fom, tom: values.tom }),
    },
    [PeriodeUtsettelseFormField.bekrefterArbeidIPerioden]: {
        isAnswered: ({ values }) =>
            values.årsak !== UtsettelseÅrsakType.Arbeid ||
            (hasValue(values.bekrefterArbeidIPerioden) && values.bekrefterArbeidIPerioden !== undefined),
        isIncluded: ({ values }) => hasValue(values.årsak) && values.årsak === UtsettelseÅrsakType.Arbeid,
        visibilityFilter: ({ values }) => hasValue(values.årsak),
    },
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: {
        isAnswered: ({ values, søkerErFarEllerMedmorOgKunDeHarRett }) =>
            hasValue(values.morsAktivitetIPerioden) || !søkerErFarEllerMedmorOgKunDeHarRett,
        isIncluded: ({ søkerErFarEllerMedmorOgKunDeHarRett }) => søkerErFarEllerMedmorOgKunDeHarRett,
        visibilityFilter: ({ values }) => hasValue(values.årsak),
    },
};

export const periodeUtsettelseFormQuestionsConfig = Questions<
    PeriodeUtsettelseFormConfigPayload,
    PeriodeUtsettelseFormField
>(PeriodeUtsettelseFormConfig);
