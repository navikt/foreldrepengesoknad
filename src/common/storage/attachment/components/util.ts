import { guid } from 'nav-frontend-js-utils';
import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../../app/types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import {
    Overføringsperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../../../../app/types/uttaksplan/periodetyper';
import { getOverføringÅrsakSkjemanummer } from '../../../../app/util/skjemanummer/overføringÅrsakSkjemanummer';
import { getMorsAktivitetSkjemanummer } from '../../../../app/util/skjemanummer/morsAktivitetSkjemanummer';
import { AnnenInntektType } from '../../../../app/types/søknad/AnnenInntekt';

export const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType
): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type,
    skjemanummer,
    innsendingsType
});

export const isAttachmentWithError = ({ pending, uploaded, innsendingsType }: Attachment) => {
    if (innsendingsType === InnsendingsType.SEND_SENERE) {
        return false;
    }
    return pending === false && uploaded === false;
};

export const getSkjemanummerForPeriode = (periode: Periode): Skjemanummer => {
    if (periode.type === Periodetype.Overføring) {
        return getOverføringÅrsakSkjemanummer((periode as Overføringsperiode).årsak);
    } else if ((periode as any).morsAktivitetIPerioden) {
        return getMorsAktivitetSkjemanummer((periode as Utsettelsesperiode).morsAktivitetIPerioden);
    } else if ((periode as any).årsak === UtsettelseÅrsakType.Sykdom) {
        return Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;
    }
    return Skjemanummer.ANNET;
};

export const getAttachmentTypeForPeriode = (periode: Periode): AttachmentType => {
    if (periode.type === Periodetype.Overføring) {
        return AttachmentType.OVERFØRING_KVOTE;
    } else if (periode.type === Periodetype.Utsettelse) {
        return AttachmentType.UTSETTELSE_SYKDOM;
    } else {
        return AttachmentType.MORS_AKTIVITET_DOKUMENTASJON;
    }
};

export const getSkjemanummerForAndreInntekter = (annenInntektType: AnnenInntektType): Skjemanummer => {
    switch (annenInntektType) {
        case AnnenInntektType.MILITÆRTJENESTE:
            return Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
        case AnnenInntektType.JOBB_I_UTLANDET:
            return Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG;
        case AnnenInntektType.VENTELØNN:
            return Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
        case AnnenInntektType.SLUTTPAKKE:
            return Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
        case AnnenInntektType.LØNN_VED_VIDEREUTDANNING:
            return Skjemanummer.INNTEKTSOPPLYSNINGER;
        default:
            return Skjemanummer.ANNET;
    }
};
