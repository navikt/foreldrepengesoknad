import { MorsAktivitet_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';

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
    [PeriodeUtsettelseFormField.årsak]: UttakUtsettelseÅrsak_fpoversikt | '';
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: MorsAktivitet_fpoversikt | '';
    [PeriodeUtsettelseFormField.bekrefterArbeidIPerioden]: boolean | undefined;
}

export const PeriodeUtsettelseFormComponents = getTypedFormComponents<
    PeriodeUtsettelseFormField,
    PeriodeUtsettelseFormData
>();
