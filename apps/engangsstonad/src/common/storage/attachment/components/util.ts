import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import { guid } from 'nav-frontend-js-utils';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (file: File, type: AttachmentType, skjemanummer: Skjemanummer): Attachment => {
    return {
        id: generateAttachmentId(),
        file,
        filename: file.name,
        filesize: file.size,
        uploaded: false,
        pending: false,
        type,
        skjemanummer,
    };
};

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;
