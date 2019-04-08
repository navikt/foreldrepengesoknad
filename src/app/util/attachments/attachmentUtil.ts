import { isArrayOfAttachments, removeAttachmentsWithUploadError } from '../cleanup/cleanupSøknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export const findAllAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                const attachmentWithoutUploadError = [...removeAttachmentsWithUploadError(object[key])];
                foundAttachments.push(...attachmentWithoutUploadError);
            } else {
                foundAttachments.push(...findAllAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};
