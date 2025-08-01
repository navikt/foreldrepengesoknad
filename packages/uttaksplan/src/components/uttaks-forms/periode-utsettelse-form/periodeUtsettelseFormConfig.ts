import { MorsAktivitet, UtsettelseÅrsakType } from '@navikt/fp-common';

import { getTypedFormComponents } from '../../../formik-wrappers';

export enum PeriodeUtsettelseFormField {
    fom = 'fom',
    tom = 'tom',
    årsak = 'årsak',
    morsAktivitetIPerioden = 'morsAktivitetIPerioden',
    bekrefterArbeidIPerioden = 'bekrefterArbeidIPerioden',
}
export interface PeriodeUtsettelseFormData {
    [PeriodeUtsettelseFormField.fom]: Date | undefined;
    [PeriodeUtsettelseFormField.tom]: Date | undefined;
    [PeriodeUtsettelseFormField.årsak]: UtsettelseÅrsakType | '';
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: MorsAktivitet | '';
    [PeriodeUtsettelseFormField.bekrefterArbeidIPerioden]: boolean | undefined;
}

export const PeriodeUtsettelseFormComponents = getTypedFormComponents<
    PeriodeUtsettelseFormField,
    PeriodeUtsettelseFormData
>();
