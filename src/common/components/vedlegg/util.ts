import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'storage/attachment/types/Attachment';

export const concatNewFiles = (
    files: Attachment[],
    storedFiles: Attachment[]
): Attachment[] => {
    const newFiles = files.filter(
        (file) =>
            storedFiles.find(
                (storedFile: Attachment) =>
                    storedFile.filename === file.filename
            ) === undefined
    );
    return [...storedFiles, ...newFiles];
};

export const removeFileFromArray = (
    file: Attachment,
    storedFiles: Attachment[]
) => {
    return storedFiles.filter(
        (storedFile: Attachment) => storedFile.filename !== file.filename
    );
};

export const mapFileToAttachment = (file: File): Attachment => ({
    id: guid(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false
});
