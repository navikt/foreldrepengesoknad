import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react';

import { FileObject } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import type { FileUploaderAttachment } from './FileUploaderAttachment';
import {
    convertToInternalFormat,
    getPendingAttachmentFromFile,
    isAcceptedAttachment,
    isFailedAttachment,
    uploadAttachment,
} from './fileUploaderUtils';

interface Args {
    existingAttachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    uploadPath: string;
    timeout?: number;
}

const addOrReplaceAttachments = (
    currentAttachments: FileUploaderAttachment[],
    attachmentsToAdd: FileUploaderAttachment[],
): FileUploaderAttachment[] => {
    const filenamesToReplace = new Set(attachmentsToAdd.map((a) => a.attachmentData.filename));
    return [
        ...currentAttachments.filter((a) => !filenamesToReplace.has(a.attachmentData.filename)),
        ...attachmentsToAdd,
    ];
};

const replaceAttachmentByFilename = (
    currentAttachments: FileUploaderAttachment[],
    updatedAttachment: FileUploaderAttachment,
): FileUploaderAttachment[] =>
    currentAttachments.map((a) =>
        a.attachmentData.filename === updatedAttachment.attachmentData.filename ? updatedAttachment : a,
    );

const uploadPendingAttachments = async ({
    pendingAttachments,
    uploadPath,
    timeout,
    setAttachments,
}: {
    pendingAttachments: FileUploaderAttachment[];
    uploadPath: string;
    timeout?: number;
    setAttachments: Dispatch<SetStateAction<FileUploaderAttachment[]>>;
}): Promise<void> => {
    for (const pendingAttachment of pendingAttachments) {
        if (pendingAttachment.fileObject.error) {
            continue;
        }

        await uploadAttachment(pendingAttachment.attachmentData, uploadPath, timeout);
        setAttachments((current) => replaceAttachmentByFilename(current, pendingAttachment));
    }
};

export const useFileUploader = ({ existingAttachments, attachmentType, skjemanummer, uploadPath, timeout }: Args) => {
    const [attachments, setAttachments] = useState(() => convertToInternalFormat(existingAttachments));

    const saveFiles = useCallback(
        (files: FileObject[]) => {
            const pendingAttachments = files.map((file) =>
                getPendingAttachmentFromFile(file, attachmentType, skjemanummer),
            );

            setAttachments((current) => addOrReplaceAttachments(current, pendingAttachments));

            void uploadPendingAttachments({ pendingAttachments, uploadPath, timeout, setAttachments });
        },
        [attachmentType, skjemanummer, uploadPath, timeout],
    );

    const deleteAttachment = useCallback((fileToRemove: FileObject) => {
        setAttachments((current) => current.filter((a) => a.fileObject !== fileToRemove));
    }, []);

    const acceptedAttachments = useMemo(() => attachments.filter(isAcceptedAttachment), [attachments]);
    const failedAttachments = useMemo(() => attachments.filter(isFailedAttachment), [attachments]);
    const successfulAttachments = useMemo(
        () => acceptedAttachments.filter((a) => a.attachmentData.pending === false).map((a) => a.attachmentData),
        [acceptedAttachments],
    );
    const hasPendingUploads = useMemo(
        () => acceptedAttachments.some((a) => a.attachmentData.pending === true),
        [acceptedAttachments],
    );

    return {
        saveFiles,
        deleteAttachment,
        acceptedAttachments,
        failedAttachments,
        successfulAttachments,
        hasPendingUploads,
    };
};
