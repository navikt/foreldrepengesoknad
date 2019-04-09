import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isArrayOfAttachments, removeAttachmentsWithUploadError } from 'app/util/cleanup/cleanupSøknad';

export const findAllAttachments = (
    object: object,
    currentKey?: string,
    previousEntries?: Map<string, Attachment[]>
): Map<string, Attachment[]> => {
    const path: string = currentKey || 'søknad';
    let foundAttachments = previousEntries || new Map();
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
