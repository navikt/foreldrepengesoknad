import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Forelder } from 'app/types/Forelder';
import { isUtsettelsesperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { PeriodeUtsettelseFormData, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';

export const initialValues: PeriodeUtsettelseFormData = {
    [PeriodeUtsettelseFormField.fom]: undefined,
    [PeriodeUtsettelseFormField.tom]: undefined,
    [PeriodeUtsettelseFormField.årsak]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPeriodenDokumentasjon]: [],
    [PeriodeUtsettelseFormField.vedlegg]: [],
};

const getFormStateFraVedlegg = (vedlegg: Attachment[], gjelderMorsAktivitet: boolean): Attachment[] => {
    return gjelderMorsAktivitet
        ? vedlegg.filter((v) => v.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON)
        : vedlegg.filter((v) => v.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON);
};

export const getPeriodeUtsettelseFormInitialValues = (periode: Periode): PeriodeUtsettelseFormData => {
    if (isUtsettelsesperiode(periode)) {
        return {
            ...initialValues,
            fom: periode.tidsperiode.fom,
            tom: periode.tidsperiode.tom,
            årsak: periode.årsak,
            morsAktivitetIPerioden: periode.morsAktivitetIPerioden ? periode.morsAktivitetIPerioden : '',
            morsAktivitetIPeriodenDokumentasjon: getFormStateFraVedlegg(periode.vedlegg || [], true),
            vedlegg: getFormStateFraVedlegg(periode.vedlegg || [], false),
        };
    }

    return initialValues;
};

const getVedleggFraFormState = (
    morsAktivitetIPeriodenDokumentasjon: Attachment[],
    vedlegg: Attachment[]
): Attachment[] => {
    return [...morsAktivitetIPeriodenDokumentasjon, ...vedlegg];
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
        vedlegg: getVedleggFraFormState(values.morsAktivitetIPeriodenDokumentasjon || [], values.vedlegg || []),
    };
};

export const cleanupPeriodeUtsettelseFormData = (values: PeriodeUtsettelseFormData): PeriodeUtsettelseFormData => {
    return values;
};
