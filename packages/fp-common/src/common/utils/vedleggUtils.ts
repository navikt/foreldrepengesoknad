import { Attachment, AttachmentMetadata, InnsendingsType } from '@navikt/fp-types';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { guid } from './guid';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFilTilVedlegg = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType,
    dokumenterer?: AttachmentMetadata,
): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type,
    skjemanummer,
    innsendingsType,
    dokumenterer,
});

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;

export const lagSendSenereDokument = (
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    dokumenterer?: AttachmentMetadata,
) => {
    return mapFilTilVedlegg(
        { name: '', size: '' } as any,
        type,
        skjemanummer,
        InnsendingsType.SEND_SENERE,
        dokumenterer,
    );
};

export const lagSendSenereDokumentNårIngenAndreFinnes = (
    dokumenter: Attachment[],
    type: AttachmentType,
    skjema: Skjemanummer,
    dokumenterer?: AttachmentMetadata,
): Attachment[] => {
    if (dokumenter.length === 0) {
        return [lagSendSenereDokument(type, skjema, dokumenterer)];
    }
    if (dokumenter.length === 1) {
        return dokumenter;
    }
    return dokumenter.filter((dok) => dok.innsendingsType !== InnsendingsType.SEND_SENERE);
};

export const isArrayOfAttachments = (object: any): object is readonly Attachment[] => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.every(
            (element) => element && (element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE),
        )
    );
};

export const removeAttachmentsWithUploadError = (attachments: readonly Attachment[]) =>
    attachments.filter(
        (a: Attachment) => !isAttachmentWithError(a) || a.innsendingsType === InnsendingsType.SEND_SENERE,
    );

const isPOJO = (arg: unknown): arg is Record<string, unknown> => {
    if (arg == null || typeof arg !== 'object') {
        return false;
    }

    const proto = Object.getPrototypeOf(arg);

    if (proto == null) {
        return true; // Object.create(null)
    }

    return proto === Object.prototype;
};

export const extractAttachments = (søknad: unknown, foundAttachments: Attachment[]): any => {
    if (Array.isArray(søknad)) {
        return søknad.map((v) => extractAttachments(v, foundAttachments));
    }

    if (!isPOJO(søknad)) {
        return søknad;
    }

    const ret: any = {};

    Object.keys(søknad).forEach((key: string) => {
        const value = søknad[key];
        if (typeof value === 'object') {
            if (isArrayOfAttachments(value)) {
                const attachmentWithoutUploadError = removeAttachmentsWithUploadError(value);
                foundAttachments.push(...attachmentWithoutUploadError);
                ret[key] = (value as Attachment[])
                    .filter((attachment: Attachment) => attachmentWithoutUploadError.includes(attachment))
                    .map((attachment: Attachment) => attachment.id);
            } else if (Array.isArray(value)) {
                ret[key] = value.map((v) => extractAttachments(v, foundAttachments));
            } else {
                ret[key] = extractAttachments(value, foundAttachments);
            }
        } else {
            ret[key] = value;
        }
    });

    return ret;
};
