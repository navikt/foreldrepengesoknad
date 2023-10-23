import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { guid } from '@navikt/fp-common';

export const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType,
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

export const isAttachmentWithError = ({ pending, uploaded, innsendingsType, filesize }: Attachment) => {
    if (innsendingsType === InnsendingsType.SEND_SENERE) {
        return false;
    }
    return (pending === false && uploaded === false) || filesize === 0;
};
