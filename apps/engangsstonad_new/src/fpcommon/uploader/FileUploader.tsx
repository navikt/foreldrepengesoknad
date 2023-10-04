import { useCallback, useEffect, useMemo, useState } from 'react';
import { VStack } from '@navikt/ds-react';

import FileInput from './input/FileInput';
import AttachmentList from './liste/AttachmentList';
import { Attachment, AttachmentType, Skjemanummer } from './typer/Attachment';
import AttachmentApi from './attachmentApi';
import { isAttachmentWithError, mapFileToAttachment } from './fileUtils';

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];

const getPendingAttachmentFromFile = (
    file: File,
    attachmentType: AttachmentType,
    skjemanummber: Skjemanummer,
): Attachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummber);
    newAttachment.pending = true;
    return newAttachment;
};

const uploadAttachment = async (attachment: Attachment, restApiUrl: string): Promise<void> => {
    if (!fileExtensionIsValid(attachment.file.name)) {
        attachment.pending = false;
        return;
    }

    try {
        const response = await AttachmentApi.saveAttachment(attachment, restApiUrl);
        attachment.pending = false;
        attachment.url = response.headers.location;
        attachment.uploaded = true;
        attachment.uuid = response.data;
    } catch (error) {
        debugger;
        attachment.pending = false;
    }
};

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

const EMPTY_ATTACHMENT_LIST = [] as Attachment[];

interface Props {
    updateAttachments: (attachments: Attachment[]) => void;
    attachmentType: AttachmentType;
    skjemanummber: Skjemanummer;
    existingAttachments?: Attachment[];
    restApiUrl: string;
}

const FileUploader: React.FunctionComponent<Props> = ({
    existingAttachments = EMPTY_ATTACHMENT_LIST,
    updateAttachments,
    attachmentType,
    skjemanummber,
    restApiUrl,
}) => {
    const [attachments, setAttachments] = useState(existingAttachments);

    useEffect(() => {
        updateAttachments(attachments);
    }, [attachments]);

    const uploadAttachments = async (allPendingAttachments: Attachment[]) => {
        for (const pendingAttachment of allPendingAttachments) {
            await uploadAttachment(pendingAttachment, restApiUrl);
            setAttachments((currentAttachments) =>
                currentAttachments.map((a) => (a.filename === pendingAttachment.filename ? pendingAttachment : a)),
            );
        }
    };

    const saveFiles = useCallback((files: File[]) => {
        const allPendingAttachments = files.map((file) =>
            getPendingAttachmentFromFile(file, attachmentType, skjemanummber),
        );
        setAttachments((currentAttachments) => currentAttachments.concat(allPendingAttachments));
        uploadAttachments(allPendingAttachments);
    }, []);

    const deleteAttachment = useCallback((file: Attachment) => {
        setAttachments((currentAttachments) => currentAttachments.filter((a) => a.filename !== file.filename));
    }, []);

    const uploadedAttachments = useMemo(() => attachments.filter((a) => !isAttachmentWithError(a)), [attachments]);

    return (
        <VStack gap="1">
            <AttachmentList attachments={uploadedAttachments} showFileSize={true} onDelete={deleteAttachment} />
            <FileInput
                accept={VALID_EXTENSIONS.join(', ')}
                onFilesSelect={saveFiles}
                hasUplodedAttachements={uploadedAttachments.length > 0}
            />
        </VStack>
    );
};

export default FileUploader;
