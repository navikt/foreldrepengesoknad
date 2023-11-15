import { Arbeidsform, MorsAktivitet, UtsettelseÅrsakType } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum PeriodeUtsettelseFormField {
    fom = 'fom',
    tom = 'tom',
    årsak = 'årsak',
    morsAktivitetIPerioden = 'morsAktivitetIPerioden',
    bekrefterArbeidIPerioden = 'bekrefterArbeidIPerioden',
}

export type ArbeidUnderUtsettelse = Arbeidsform | string;

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
