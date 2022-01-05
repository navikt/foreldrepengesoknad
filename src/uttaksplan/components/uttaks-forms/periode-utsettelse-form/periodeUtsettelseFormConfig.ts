import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

export enum PeriodeUtsettelseFormField {
    fom = 'fom',
    tom = 'tom',
    årsak = 'årsak',
}

export interface PeriodeUtsettelseFormData {
    [PeriodeUtsettelseFormField.fom]: Date | undefined;
    [PeriodeUtsettelseFormField.tom]: Date | undefined;
    [PeriodeUtsettelseFormField.årsak]: UtsettelseÅrsakType | '';
}

export const PeriodeUtsettelseFormComponents = getTypedFormComponents<
    PeriodeUtsettelseFormField,
    PeriodeUtsettelseFormData,
    string
>();
