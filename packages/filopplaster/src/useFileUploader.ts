import { useCallback, useMemo, useState } from 'react';

import { FileObject } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

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

export const useFileUploader = ({ existingAttachments, attachmentType, skjemanummer, uploadPath, timeout }: Args) => {
    const [attachments, setAttachments] = useState(() => convertToInternalFormat(existingAttachments));

    const saveFiles = useCallback(
        (files: FileObject[]) => {
            const pendingAttachments = files.map((file) =>
                getPendingAttachmentFromFile(file, attachmentType, skjemanummer),
            );

            setAttachments((current) => {
                const untouched = current.filter(
                    (c) => !pendingAttachments.some((p) => p.attachmentData.filename === c.attachmentData.filename),
                );
                return [...untouched, ...pendingAttachments];
            });

            void (async () => {
                for (const pending of pendingAttachments.filter((p) => !p.fileObject.error)) {
                    await uploadAttachment(pending.attachmentData, uploadPath, timeout);
                    setAttachments((current) =>
                        current.map((c) =>
                            c.attachmentData.filename === pending.attachmentData.filename ? pending : c,
                        ),
                    );
                }
            })();
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
