import { MorsAktivitet, Periode, isUttaksperiode, lagSendSenereDokumentNårIngenAndreFinnes } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, InnsendingsType } from '@navikt/fp-types';
import { VedleggDataType } from 'app/types/VedleggDataType';

export const grupperteFellesperioderMorsAktivitetArbeidUtdanningEllerSykdom = (perioder: Periode[]) => {
    return perioder.filter(morsAktivitetErArbeidUtdanningEllerSykdom);
};

export const grupperteFellesperioderIntroduksjonsprogram = (perioder: Periode[]) => {
    return perioder.filter(
        (p) => isUttaksperiode(p) && p.morsAktivitetIPerioden === MorsAktivitet.Introduksjonsprogrammet,
    );
};

export const grupperteFellesperioderKvalifiseringsprogram = (perioder: Periode[]) => {
    return perioder.filter(
        (p) => isUttaksperiode(p) && p.morsAktivitetIPerioden === MorsAktivitet.Kvalifiseringsprogrammet,
    );
};

export const isKvalifiseringsprogramVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
};

export const isIntroduksjonsprogramVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
};

export const isArbeidUtdanningEllerSykdomVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;
};

export const isOverføringsVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_OVERFØRING_FOR_SYK;
};

export const getOverføringsVedlegg = (vedlegg: VedleggDataType) => {
    const overføringsVedlegg = vedlegg[Skjemanummer.DOK_OVERFØRING_FOR_SYK]
        ? vedlegg[Skjemanummer.DOK_OVERFØRING_FOR_SYK]
        : [];

    return overføringsVedlegg;
};

export const isOmsorgsovertakelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.OMSORGSOVERTAKELSE;
};

export const getOmsorgsovertakelseVedlegg = (vedlegg: VedleggDataType) => {
    const omsorgsovertakelseVedlegg = vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        ? vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        : [];

    return omsorgsovertakelseVedlegg;
};

export const isAleneOmOmsorgVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_AV_ALENEOMSORG;
};

export const getAleneOmOmsorgVedlegg = (vedlegg: VedleggDataType) => {
    const aleneOmOmsorgVedlegg = vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        ? vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        : [];

    return aleneOmOmsorgVedlegg;
};

export const isTerminbekreftelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.TERMINBEKREFTELSE;
};

export const getTerminbekreftelseVedlegg = (vedlegg: VedleggDataType) => {
    const terminbekreftelseVedlegg = vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        ? vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        : [];

    return terminbekreftelseVedlegg;
};

export const isAndreInntekterVedlegg = (attachment: Attachment) => {
    return (
        attachment.skjemanummer === Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE ||
        attachment.skjemanummer === Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
    );
};

export const getAndreInntekterVedlegg = (vedlegg: VedleggDataType) => {
    const andreInntekterVedlegg = [];

    const militær = vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE];
    const etterlønn = vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG];

    if (militær) {
        andreInntekterVedlegg.push(...militær);
    }

    if (etterlønn) {
        andreInntekterVedlegg.push(...etterlønn);
    }

    return andreInntekterVedlegg;
};

export const isMilitærVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
};

export const isEtterlønnVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
};

export const isFedrekvoteMorForSykVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE;
};

export const getFedrekvoteMorForSykVedlegg = (vedlegg: VedleggDataType) => {
    const fedrekvoteMorForSykVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE]
        : [];

    return fedrekvoteMorForSykVedlegg;
};

export const isUtsettelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE;
};

const morsAktivitetErArbeidUtdanningEllerSykdom = (periode: Periode) => {
    if (!isUttaksperiode(periode)) {
        return false;
    }

    return (
        periode.morsAktivitetIPerioden === MorsAktivitet.Arbeid ||
        periode.morsAktivitetIPerioden === MorsAktivitet.ArbeidOgUtdanning ||
        periode.morsAktivitetIPerioden === MorsAktivitet.Utdanning ||
        periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt ||
        periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp
    );
};

export const isFellesperiodeAttachment = (attachment: Attachment) => {
    return (
        attachment.skjemanummer === Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM ||
        attachment.skjemanummer === Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET ||
        attachment.skjemanummer === Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    );
};

export const getFellesperiodeVedlegg = (vedlegg: VedleggDataType) => {
    const fellesperiodeVedlegg = [];

    const aktivitetskravArbUtdSyk = vedlegg[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM];
    const aktivitetskravIntro = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET];
    const aktivitetskravKval = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM];

    if (aktivitetskravArbUtdSyk) {
        fellesperiodeVedlegg.push(...aktivitetskravArbUtdSyk);
    }

    if (aktivitetskravIntro) {
        fellesperiodeVedlegg.push(...aktivitetskravIntro);
    }

    if (aktivitetskravKval) {
        fellesperiodeVedlegg.push(...aktivitetskravKval);
    }

    return fellesperiodeVedlegg;
};

export const lagSendSenereDokumentOmPåkrevd = (
    attachments: Attachment[],
    required: boolean,
    skjemanummer: Skjemanummer,
    attachmentType: AttachmentType,
) => {
    if (required) {
        return lagSendSenereDokumentNårIngenAndreFinnes(attachments, attachmentType, skjemanummer);
    }

    return attachments;
};

export const isSendSenereVedlegg = (attachment: Attachment) => {
    return attachment.innsendingsType === InnsendingsType.SEND_SENERE;
};
