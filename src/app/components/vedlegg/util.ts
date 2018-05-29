import { Attachment } from '../../types/Attachment';

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
    file,
    filename: file.name,
    filesize: file.size
});
