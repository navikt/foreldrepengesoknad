import { useCallback, useEffect, useMemo, useState } from 'react';
import { VStack } from '@navikt/ds-react';

import FileInput from './input/FileInput';
import AttachmentList from './liste/AttachmentList';
import { Attachment, AttachmentType, Skjemanummer } from './typer/Attachment';
import AttachmentApi from './attachmentApi';
import { mapFileToAttachment } from './fileUtils';
import FailedAttachmentList from './liste/FailedAttachmentList';
import { FileUploadError } from './typer/FileUploadError';

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_KB = 16777;
const KILOBYTES_IN_BYTE = 0.0009765625;

const getPendingAttachmentFromFile = (
    file: File,
    attachmentType: AttachmentType,
    skjemanummber: Skjemanummer,
): Attachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummber);
    newAttachment.pending = true;
    return newAttachment;
};

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

const fileSizeIsValid = (filesizeInB: number): boolean => {
    const filesizeInKb = filesizeInB * KILOBYTES_IN_BYTE;
    return filesizeInKb <= MAX_FIL_STØRRELSE_KB;
};

const uploadAttachment = async (attachment: Attachment, restApiUrl: string): Promise<void> => {
    if (!fileExtensionIsValid(attachment.file.name)) {
        attachment.pending = false;
        attachment.error = FileUploadError.VALID_EXTENSION;
        return;
    }
    if (!fileSizeIsValid(attachment.filesize)) {
        attachment.pending = false;
        attachment.error = FileUploadError.MAX_SIZE;
        return;
    }

    try {
        const response = await AttachmentApi.saveAttachment(attachment, restApiUrl);
        attachment.pending = false;
        attachment.url = response.headers.location;
        attachment.uploaded = true;
        attachment.uuid = response.data;
    } catch (error) {
        // TODO Burde få ut feilmelding frå backend og vise denne
        attachment.pending = false;
        attachment.error = FileUploadError.GENERAL;
    }
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

    const uploadedAttachments = useMemo(() => attachments.filter((a) => !a.error), [attachments]);
    const failedAttachments = useMemo(() => attachments.filter((a) => !!a.error), [attachments]);

    return (
        <VStack gap="6">
            <AttachmentList attachments={uploadedAttachments} showFileSize={true} onDelete={deleteAttachment} />
            <FileInput
                accept={VALID_EXTENSIONS.join(', ')}
                onFilesSelect={saveFiles}
                hasUplodedAttachements={uploadedAttachments.length > 0}
            />
            <FailedAttachmentList failedAttachments={failedAttachments} onDelete={deleteAttachment} />
        </VStack>
    );
};

export default FileUploader;
