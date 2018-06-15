import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from '../../../../app/types/søknad/Søknad';

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType
): Attachment => ({
    id: guid(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type
});
