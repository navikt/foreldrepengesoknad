import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { isArrayOfAttachments } from 'app/util/cleanup/cleanupSøknad';

export const findAllAttachments = (
    object: any,
    currentKey?: string,
    previousEntries?: Map<string, Attachment[]>
): Map<string, Attachment[]> => {
    if (object === null || object === undefined) {
        return new Map();
    }

    const path: string = currentKey || 'søknad';
    let foundAttachments = previousEntries || new Map();
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.set(path + '.' + key, Array.from(object[key]));
            } else {
                foundAttachments = findAllAttachments(object[key], path + '.' + key, foundAttachments);
            }
        }
    });
    return foundAttachments;
};
