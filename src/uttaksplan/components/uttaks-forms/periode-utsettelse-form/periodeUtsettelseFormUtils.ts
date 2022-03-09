import { Forelder } from 'app/types/Forelder';
import { isUtsettelsesperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

export const initialValues: PeriodeUtsettelseFormData = {
    [PeriodeUtsettelseFormField.fom]: undefined,
    [PeriodeUtsettelseFormField.tom]: undefined,
    [PeriodeUtsettelseFormField.årsak]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: '',
    [PeriodeUtsettelseFormField.vedlegg]: [],
};

export const getPeriodeUtsettelseFormInitialValues = (periode: Periode): PeriodeUtsettelseFormData => {
    if (isUtsettelsesperiode(periode)) {
        return {
            ...initialValues,
            fom: periode.tidsperiode.fom,
            tom: periode.tidsperiode.tom,
            årsak: periode.årsak,
            morsAktivitetIPerioden: periode.morsAktivitetIPerioden ? periode.morsAktivitetIPerioden : '',
            vedlegg: periode.vedlegg || [],
        };
    }

    return initialValues;
};

export const mapPeriodeUtsettelseFormToPeriode = (
    values: Partial<PeriodeUtsettelseFormData>,
    id: string,
    erFarEllerMedmor: boolean
): Periode => {
    return {
        id,
        type: Periodetype.Utsettelse,
        årsak: values.årsak as UtsettelseÅrsakType,
        erArbeidstaker: false,
        morsAktivitetIPerioden: values.morsAktivitetIPerioden ? values.morsAktivitetIPerioden : undefined,
        forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        vedlegg: values.vedlegg,
    };
};

export const cleanupPeriodeUtsettelseFormData = (values: PeriodeUtsettelseFormData): PeriodeUtsettelseFormData => {
    return values;
};
