import {
    Forelder,
    Periode,
    Periodetype,
    UtsettelseÅrsakType,
    isUtsettelsePgaArbeid,
    isUtsettelsesperiode,
} from '@navikt/fp-common';

import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

export const initialValues: PeriodeUtsettelseFormData = {
    [PeriodeUtsettelseFormField.fom]: undefined,
    [PeriodeUtsettelseFormField.tom]: undefined,
    [PeriodeUtsettelseFormField.årsak]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: '',
    [PeriodeUtsettelseFormField.bekrefterArbeidIPerioden]: undefined,
};

export const getPeriodeUtsettelseFormInitialValues = (periode: Periode): PeriodeUtsettelseFormData => {
    if (isUtsettelsesperiode(periode)) {
        return {
            ...initialValues,
            fom: periode.tidsperiode.fom,
            tom: periode.tidsperiode.tom,
            årsak: periode.årsak,
            morsAktivitetIPerioden: periode.morsAktivitetIPerioden ? periode.morsAktivitetIPerioden : '',
            bekrefterArbeidIPerioden: isUtsettelsePgaArbeid(periode) ? periode.bekrefterArbeidIPerioden : undefined,
        };
    }

    return initialValues;
};

export const mapPeriodeUtsettelseFormToPeriode = (
    values: Partial<PeriodeUtsettelseFormData>,
    id: string,
    erFarEllerMedmor: boolean,
): Periode => {
    return {
        id,
        type: Periodetype.Utsettelse,
        årsak: values.årsak as UtsettelseÅrsakType,
        morsAktivitetIPerioden: values.morsAktivitetIPerioden ? values.morsAktivitetIPerioden : undefined,
        forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        bekrefterArbeidIPerioden: values.bekrefterArbeidIPerioden,
        erArbeidstaker: !!values.bekrefterArbeidIPerioden,
    };
};

export const cleanupPeriodeUtsettelseFormData = (values: PeriodeUtsettelseFormData): PeriodeUtsettelseFormData => {
    if (values.årsak !== UtsettelseÅrsakType.Arbeid) {
        return {
            ...values,
            bekrefterArbeidIPerioden: undefined,
        };
    }
    return values;
};
