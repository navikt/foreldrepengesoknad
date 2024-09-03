import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadata } from '@navikt/fp-types';

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
