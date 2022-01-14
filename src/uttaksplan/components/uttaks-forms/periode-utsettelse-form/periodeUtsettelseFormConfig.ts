import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

export enum PeriodeUtsettelseFormField {
    fom = 'fom',
    tom = 'tom',
    årsak = 'årsak',
    vedlegg = 'vedlegg',
}

export interface PeriodeUtsettelseFormData {
    [PeriodeUtsettelseFormField.fom]: Date | undefined;
    [PeriodeUtsettelseFormField.tom]: Date | undefined;
    [PeriodeUtsettelseFormField.årsak]: UtsettelseÅrsakType | '';
    [PeriodeUtsettelseFormField.vedlegg]: Attachment[];
}

export const PeriodeUtsettelseFormComponents = getTypedFormComponents<
    PeriodeUtsettelseFormField,
    PeriodeUtsettelseFormData,
    string
>();
