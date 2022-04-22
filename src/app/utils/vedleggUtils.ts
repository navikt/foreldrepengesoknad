import { EndringssøknadForInnsending, SøknadForInnsending } from 'app/api/apiUtils';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { guid } from 'nav-frontend-js-utils';
import { Periode } from 'uttaksplan/types/Periode';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFilTilVedlegg = (
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
    innsendingsType,
});

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;

export const lagSendSenereDokument = (type: AttachmentType, skjemanummer: Skjemanummer) => {
    return mapFilTilVedlegg({ name: '', size: '' } as any, type, skjemanummer, InnsendingsType.SEND_SENERE);
};

export const lagSendSenereDokumentNårIngenAndreFinnes = (
    dokumenter: Attachment[],
    type: AttachmentType,
    skjema: Skjemanummer
): Attachment[] => {
    if (dokumenter.length === 0) {
        return [lagSendSenereDokument(type, skjema)];
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
            (element) => element && (element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
        )
    );
};

export const removeAttachmentsWithUploadError = (attachments: readonly Attachment[]) =>
    attachments.filter(
        (a: Attachment) => !isAttachmentWithError(a) || a.innsendingsType === InnsendingsType.SEND_SENERE
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

const extractAttachments = (søknad: unknown, foundAttachments: Attachment[]): any => {
    if (Array.isArray(søknad)) {
        return søknad.map((v) => extractAttachments(v, foundAttachments));
    }

    if (!isPOJO(søknad)) {
        return søknad;
    }

    const ret = {};

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

export const mapAttachmentsToSøknadForInnsending = (
    søknad: SøknadForInnsending | EndringssøknadForInnsending
): SøknadForInnsending | EndringssøknadForInnsending => {
    const vedlegg: Attachment[] = [];
    const søknadCopy = extractAttachments(søknad, vedlegg);

    return {
        ...søknadCopy,
        vedlegg,
    };
};

export const removeDuplicateAttachments = (uttaksplan: Periode[]) => {
    uttaksplan.forEach((p1: Periode) => {
        if (p1.vedlegg) {
            const vedleggIdRefs = p1.vedlegg.map((a: Attachment) => a.id);
            uttaksplan.forEach((p2) => {
                if (p1 !== p2 && p1.vedlegg && p2.vedlegg) {
                    p2.vedlegg.forEach((a2) => {
                        if (vedleggIdRefs.includes(a2.id)) {
                            p2.vedlegg!.splice(p2.vedlegg!.indexOf(a2), 1);
                        }
                    });
                }
            });
        }
    });
};
