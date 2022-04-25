import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Forelder } from 'app/types/Forelder';
import { Arbeidsform, isUtsettelsesperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import {
    ArbeidUnderUtsettelse,
    PeriodeUtsettelseFormData,
    PeriodeUtsettelseFormField,
} from './periodeUtsettelseFormConfig';

export const initialValues: PeriodeUtsettelseFormData = {
    [PeriodeUtsettelseFormField.fom]: undefined,
    [PeriodeUtsettelseFormField.tom]: undefined,
    [PeriodeUtsettelseFormField.årsak]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPerioden]: '',
    [PeriodeUtsettelseFormField.morsAktivitetIPeriodenDokumentasjon]: [],
    [PeriodeUtsettelseFormField.vedlegg]: [],
    [PeriodeUtsettelseFormField.arbeidsformer]: undefined,
};

const getFormStateFraVedlegg = (vedlegg: Attachment[], gjelderMorsAktivitet: boolean): Attachment[] => {
    return gjelderMorsAktivitet
        ? vedlegg.filter((v) => v.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON)
        : vedlegg.filter((v) => v.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON);
};

const getArbeidsformerFromPeriode = (periode: Periode): ArbeidUnderUtsettelse[] | undefined => {
    if (isUtsettelsesperiode(periode)) {
        const frilansSNE = periode.arbeidsformer
            ? periode.arbeidsformer.filter((af) => af !== Arbeidsform.arbeidstaker)
            : [];
        const orgnummere = periode.orgnumre && periode.orgnumre.length > 0 ? periode.orgnumre : [];
        const arbeidsformerForPeriode: ArbeidUnderUtsettelse[] = [...orgnummere, ...frilansSNE];
        return arbeidsformerForPeriode.length > 0 ? arbeidsformerForPeriode : undefined;
    }
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
            arbeidsformer: getArbeidsformerFromPeriode(periode),
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

const mapArbeidTilArbeidsform = (arbeidsform: ArbeidUnderUtsettelse) => {
    if (arbeidsform === Arbeidsform.frilans || arbeidsform === Arbeidsform.selvstendignæringsdrivende)
        return arbeidsform;
    return Arbeidsform.arbeidstaker;
};

const getErArbeidstaker = (arbeidsformer: ArbeidUnderUtsettelse[]): boolean => {
    return (
        arbeidsformer.filter((a) => a !== Arbeidsform.frilans && a !== Arbeidsform.selvstendignæringsdrivende).length >
        0
    );
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
        morsAktivitetIPerioden: values.morsAktivitetIPerioden ? values.morsAktivitetIPerioden : undefined,
        forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        vedlegg: getVedleggFraFormState(values.morsAktivitetIPeriodenDokumentasjon || [], values.vedlegg || []),
        arbeidsformer:
            values.arbeidsformer!.length > 0
                ? values.arbeidsformer?.map((af) => mapArbeidTilArbeidsform(af))
                : undefined,
        orgnumre:
            values.arbeidsformer!.length > 0
                ? values.arbeidsformer?.filter(
                      (a) => a !== Arbeidsform.frilans && a !== Arbeidsform.selvstendignæringsdrivende
                  )
                : undefined,
        erArbeidstaker:
            values.arbeidsformer!.length > 0 && values.arbeidsformer !== undefined
                ? getErArbeidstaker(values.arbeidsformer)
                : false,
    };
};

export const cleanupPeriodeUtsettelseFormData = (values: PeriodeUtsettelseFormData): PeriodeUtsettelseFormData => {
    if (values.årsak !== UtsettelseÅrsakType.Arbeid) {
        return {
            ...values,
            arbeidsformer: [],
        };
    }
    return values;
};
