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

export const addMetadata = (attachment: Attachment, metadata: AttachmentMetadata): Attachment => {
    return { ...attachment, dokumenterer: metadata };
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

    if (dokumenter.length === 1 && dokumenterer) {
        return dokumenter.map((dok) => addMetadata(dok, dokumenterer));
    }

    if (dokumenter.length === 1) {
        return dokumenter;
    }

    if (dokumenterer) {
        return dokumenter
            .filter((dok) => dok.innsendingsType !== InnsendingsType.SEND_SENERE)
            .map((dok) => addMetadata(dok, dokumenterer));
    }

    return dokumenter.filter((dok) => dok.innsendingsType !== InnsendingsType.SEND_SENERE);
};
