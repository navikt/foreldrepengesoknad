import { MorsAktivitet, Periode, isUttaksperiode } from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadata, InnsendingsType } from '@navikt/fp-types';

export type GyldigeSkjemanummer =
    | Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.DOK_OVERFØRING_FOR_SYK
    | Skjemanummer.DOK_INNLEGGELSE;

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

export const isFedrekvoteMorForSykVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE;
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

export const addMetadata = (attachment: Attachment, metadata: AttachmentMetadata): Attachment => {
    return { ...attachment, dokumenterer: metadata };
};

const isArrayOfAttachments = (object: any) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some((element) => element && element.innsendingsType === InnsendingsType.SEND_SENERE)
    );
};

export const finnSendSenereVedlegg = (
    object: any,
    currentKey?: string,
    previousEntries?: Map<string, Attachment[]>,
): Map<string, Attachment> => {
    if (object === null || object === undefined) {
        return new Map();
    }

    const path: string = currentKey || 'søknad';
    let foundAttachments = previousEntries || new Map();
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.set(path + '.' + key, object[key][0]);
            } else {
                foundAttachments = finnSendSenereVedlegg(object[key], path + '.' + key, foundAttachments);
            }
        }
    });
    return foundAttachments;
};
