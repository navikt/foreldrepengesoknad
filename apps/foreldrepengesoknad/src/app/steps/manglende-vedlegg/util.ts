import {
    MorsAktivitet,
    Periode,
    isFellesperiodeMorForSyk,
    isFellesperiodeMorInnlagt,
    isForeldrepengerMedAktivitetskravMorForSyk,
    isForeldrepengerMedAktivitetskravMorInnlagt,
    isOverføringFarForSyk,
    isOverføringFarInnlagt,
    isOverføringMorForSyk,
    isOverføringMorInnlagt,
    isUtsettelseMorForSyk,
    isUtsettelseMorInnlagt,
    isUttakAvFedrekvoteMorForSyk,
    isUttaksperiode,
    lagSendSenereDokumentNårIngenAndreFinnes,
} from '@navikt/fp-common';
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

export const grupperteFellesperioderMorInnlagt = (perioder: Periode[]) => {
    return perioder.filter((p) => isUttaksperiode(p) && p.morsAktivitetIPerioden === MorsAktivitet.Innlagt);
};

export const isMorInnlagtVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE_MOR;
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

export const isPeriodeMedMorInnleggelse = (periode: Periode) => {
    return (
        isOverføringMorInnlagt(periode) ||
        isUttakAvFedrekvoteMorForSyk(periode) ||
        isFellesperiodeMorInnlagt(periode) ||
        isForeldrepengerMedAktivitetskravMorInnlagt(periode) ||
        isUtsettelseMorInnlagt(periode)
    );
};

export const isPeriodeMedMorForSyk = (periode: Periode) => {
    return (
        isFellesperiodeMorForSyk(periode) ||
        isUtsettelseMorForSyk(periode) ||
        isOverføringMorForSyk(periode) ||
        isForeldrepengerMedAktivitetskravMorForSyk(periode)
    );
};

export const isPeriodeMedFarInnleggelse = (periode: Periode) => {
    return isOverføringFarInnlagt(periode);
};

export const isPeriodeMedFarForSyk = (periode: Periode) => {
    return isOverføringFarForSyk(periode);
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

export const isMorInnleggelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE_MOR;
};

export const getMorInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const morInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        : [];

    return morInnlagtVedlegg;
};

export const getMorForSykVedlegg = (vedlegg: VedleggDataType) => {
    const morForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_MOR] ? vedlegg[Skjemanummer.DOK_SYKDOM_MOR] : [];

    return morForSykVedlegg;
};

export const getFarInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const farInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        : [];

    return farInnlagtVedlegg;
};

export const getFarForSykVedlegg = (vedlegg: VedleggDataType) => {
    const farForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_FAR] ? vedlegg[Skjemanummer.DOK_SYKDOM_FAR] : [];

    return farForSykVedlegg;
};

const morsAktivitetErArbeidUtdanningEllerSykdom = (periode: Periode) => {
    if (!isUttaksperiode(periode)) {
        return false;
    }

    return (
        periode.morsAktivitetIPerioden === MorsAktivitet.Arbeid ||
        periode.morsAktivitetIPerioden === MorsAktivitet.ArbeidOgUtdanning ||
        periode.morsAktivitetIPerioden === MorsAktivitet.Utdanning ||
        periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp
    );
};

export const isFellesperiodeAttachment = (attachment: Attachment) => {
    return (
        attachment.skjemanummer === Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET ||
        attachment.skjemanummer === Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    );
};

export const getFellesperiodeVedlegg = (vedlegg: VedleggDataType) => {
    const fellesperiodeVedlegg = [];

    const aktivitetskravIntro = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET];
    const aktivitetskravKval = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM];

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
