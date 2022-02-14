import { SøknadForInnsending } from 'app/api/apiUtils';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import _ from 'lodash';
import { guid } from 'nav-frontend-js-utils';

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

export const isArrayOfAttachments = (object: any) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some(
            (element) => element && (element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
        )
    );
};

export const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

const mutateSøknadAndReturnAttachments = (object: any): Attachment[] => {
    const foundAttachments = [] as Attachment[];

    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                const attachmentWithoutUploadError = [...removeAttachmentsWithUploadError(object[key])];
                foundAttachments.push(...attachmentWithoutUploadError);
                object[key] = (object[key] as Attachment[])
                    .filter((attachment: Attachment) => attachmentWithoutUploadError.includes(attachment))
                    .map((attachment: Attachment) => attachment.id);
            } else {
                foundAttachments.push(...mutateSøknadAndReturnAttachments(object[key]));
            }
        }
    });

    return foundAttachments;
};

export const mapAttachmentsToSøknadForInnsending = (søknad: SøknadForInnsending) => {
    const søknadCopy = _.cloneDeep(søknad);

    const vedlegg = mutateSøknadAndReturnAttachments(søknadCopy);

    return {
        ...søknadCopy,
        vedlegg,
    };
};
