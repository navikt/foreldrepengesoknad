import { isArrayOfAttachments, removeAttachmentsWithUploadError } from '../cleanup/cleanupSøknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export const findAllAttachments = (
    object: object,
    currentKey?: string,
    previousMap?: Map<string, Attachment[]>
): Map<string, Attachment[]> => {
    const path: string = currentKey || 'søknad';
    let foundAttachments = previousMap || new Map();
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                const attachmentWithoutUploadError = [...removeAttachmentsWithUploadError(object[key])];
                foundAttachments.set(path + '.' + key, Array.from(attachmentWithoutUploadError));
            } else {
                foundAttachments = findAllAttachments(object[key], path + '.' + key, foundAttachments);
            }
        }
    });
    return foundAttachments;
};
