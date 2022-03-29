import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

export enum PeriodeUtsettelseFormField {
    fom = 'fom',
    tom = 'tom',
    årsak = 'årsak',
    vedlegg = 'vedlegg',
    morsAktivitetIPeriodenDokumentasjon = 'morsAktivitetIPeriodenDokumentasjon',
    morsAktivitetIPerioden = 'morsAktivitetIPerioden',
}

export interface PeriodeUtsettelseFormData {
    [PeriodeUtsettelseFormField.fom]: Date | undefined;
    [PeriodeUtsettelseFormField.tom]: Date | undefined;
    [PeriodeUtsettelseFormField.årsak]: UtsettelseÅrsakType | '';
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: MorsAktivitet | '';
    [PeriodeUtsettelseFormField.morsAktivitetIPeriodenDokumentasjon]: Attachment[];
    [PeriodeUtsettelseFormField.vedlegg]: Attachment[];
}

export const PeriodeUtsettelseFormComponents = getTypedFormComponents<
    PeriodeUtsettelseFormField,
    PeriodeUtsettelseFormData,
    string
>();
