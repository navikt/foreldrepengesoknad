import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from '../../../../app/types/søknad/Søknad';

export const SKJEMANUMMER_FOR_TERMINBEKREFTELSE = 'I000062';

export const createAttachmentCorrelationID = (type: AttachmentType) => {
    if (type === AttachmentType.TERMINBEKREFTELSE) {
        return SKJEMANUMMER_FOR_TERMINBEKREFTELSE;
    }
    return guid().replace(/-/g, '');
};

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType
): Attachment => ({
    id: createAttachmentCorrelationID(type),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type
});
