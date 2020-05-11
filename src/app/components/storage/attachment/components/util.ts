import { guid } from 'nav-frontend-js-utils';
import { Attachment, InnsendingsType } from 'app/components/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Periode, Periodetype } from '../../../../types/uttaksplan/periodetyper';
import { AnnenInntektType } from '../../../../types/søknad/AnnenInntekt';
import { getOverføringÅrsakSkjemanummer } from '../../../../util/skjemanummer/overføringÅrsakSkjemanummer';
import { getUtsettelseSkjemanummer } from '../../../../util/skjemanummer/utsettelseSkjemanummer';
import { getUttakperiodeSkjemanummer } from '../../../../util/skjemanummer/uttakSkjemanummer';

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

export const isAttachmentWithError = (attachment: Attachment) => {
    if (attachment === undefined || attachment === null) {
        return true;
    }

    const { innsendingsType, pending, uploaded, filesize } = attachment;
    return innsendingsType === InnsendingsType.SEND_SENERE
        ? false
        : (pending === false && uploaded === false) || filesize === 0;
};

export const getSkjemanummerForPeriode = (periode: Periode): Skjemanummer => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return getUtsettelseSkjemanummer(periode);
        case Periodetype.Uttak:
            return getUttakperiodeSkjemanummer(periode);
        case Periodetype.Overføring:
            return getOverføringÅrsakSkjemanummer(periode.årsak);
        default:
            return Skjemanummer.ANNET;
    }
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
        default:
            return Skjemanummer.ANNET;
    }
};

export const isAttachmentForAnnenInntekt = (type: AttachmentType) => type === AttachmentType.ANNEN_INNTEKT;

export const isAttachmentForBarn = (type: AttachmentType) =>
    type === AttachmentType.TERMINBEKREFTELSE ||
    type === AttachmentType.FØDSELSATTEST ||
    type === AttachmentType.OMSORGSOVERTAKELSE ||
    type === AttachmentType.ADOPSJONSVEDTAK ||
    type === AttachmentType.ALENEOMSORG;

export const isAttachmentForPeriode = (type: AttachmentType) =>
    type === AttachmentType.UTSETTELSE_SYKDOM ||
    type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON ||
    type === AttachmentType.HV_ØVELSE ||
    type === AttachmentType.NAV_TILTAK ||
    type === AttachmentType.OVERFØRING_KVOTE;
