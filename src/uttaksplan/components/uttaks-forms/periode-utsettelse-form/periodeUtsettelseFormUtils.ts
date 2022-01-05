import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

export const initialValues: PeriodeUtsettelseFormData = {
    [PeriodeUtsettelseFormField.fom]: undefined,
    [PeriodeUtsettelseFormField.tom]: undefined,
    [PeriodeUtsettelseFormField.årsak]: '',
};

export const getPeriodeUtsettelseFormInitialValues = (): PeriodeUtsettelseFormData => {
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
        forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
    };
};

export const cleanupPeriodeUtsettelseFormData = (values: PeriodeUtsettelseFormData): PeriodeUtsettelseFormData => {
    return values;
};
