export const concatNewFiles = (files: File[], storedFiles: File[]): File[] => {
    const newFiles = files.filter(
        (file) =>
            storedFiles.find(
                (storedFile: File) => storedFile.name === file.name
            ) === undefined
    );
    return [...storedFiles, ...newFiles];
};

export const removeFileFromArray = (file: File, storedFiles: File[]) => {
    return storedFiles.filter(
        (storedFile: File) => storedFile.name !== file.name
    );
};
