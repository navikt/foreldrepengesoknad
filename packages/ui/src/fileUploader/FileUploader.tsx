import { useCallback, useEffect, useMemo, useState } from 'react';
import { VStack } from '@navikt/ds-react';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import FileInput from './input/FileInput';
import AttachmentList from './liste/AttachmentList';
import { Attachment } from '@navikt/fp-types';
import { mapFileToAttachment } from './fileUtils';
import FailedAttachmentList from './liste/FailedAttachmentList';
import { FileUploadError } from './typer/FileUploadError';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_KB = 16777;
const KILOBYTES_IN_BYTE = 0.0009765625;

// TODO Fjern any her utan å måtte dra inn axios i denne pakka
type SaveAttachment = (attachment: Attachment) => Promise<any>;

const getPendingAttachmentFromFile = (
    file: File,
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer,
): Attachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummer);
    newAttachment.pending = true;
    return newAttachment;
};

const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    return ext ? VALID_EXTENSIONS.includes(`.${ext.toLowerCase()}`) : false;
};

const fileSizeIsValid = (filesizeInB: number): boolean => {
    const filesizeInKb = filesizeInB * KILOBYTES_IN_BYTE;
    return filesizeInKb <= MAX_FIL_STØRRELSE_KB;
};

const uploadAttachment = async (attachment: Attachment, saveAttachment: SaveAttachment): Promise<void> => {
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
        const response = await saveAttachment(attachment);
        attachment.pending = false;
        attachment.url = response.headers.location;
        attachment.uploaded = true;
        attachment.uuid = response.data;
    } catch (error) {
        // TODO Burde få ut feilmelding frå backend og vise denne
        attachment.pending = false;

        // @ts-ignore TODO Fix typing her (Mogleg  mykje av logikken her bør ligga inne i saveAttachment, så slepp ein da inn Axios her)
        if (error?.response?.status === 408) {
            attachment.error = FileUploadError.TIMEOUT;
        } else {
            attachment.error = FileUploadError.GENERAL;
        }
    }
};

const EMPTY_ATTACHMENT_LIST = [] as Attachment[];

export interface Props {
    updateAttachments: (attachments: Attachment[]) => void;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    existingAttachments?: Attachment[];
    saveAttachment: SaveAttachment;
    multiple?: boolean;
}

const FileUploader: React.FunctionComponent<Props> = ({
    existingAttachments = EMPTY_ATTACHMENT_LIST,
    updateAttachments,
    attachmentType,
    skjemanummer,
    saveAttachment,
    multiple = true,
}) => {
    const [attachments, setAttachments] = useState(existingAttachments);

    useEffect(() => {
        updateAttachments(attachments.filter((a) => !a.error && a.pending === false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attachments]);

    const saveFiles = useCallback(
        (files: File[]) => {
            const uploadAttachments = async (allPendingAttachments: Attachment[]) => {
                for (const pendingAttachment of allPendingAttachments) {
                    await uploadAttachment(pendingAttachment, saveAttachment);
                    setAttachments((currentAttachments) =>
                        currentAttachments.map((a) =>
                            a.filename === pendingAttachment.filename ? pendingAttachment : a,
                        ),
                    );
                }
            };

            const allPendingAttachments = files.map((file) =>
                getPendingAttachmentFromFile(file, attachmentType, skjemanummer),
            );
            setAttachments((currentAttachments) => {
                const otherAttachments = currentAttachments.filter(
                    (ca) => !allPendingAttachments.some((pa) => pa.filename === ca.filename),
                );
                return otherAttachments.concat(allPendingAttachments);
            });
            uploadAttachments(allPendingAttachments);
        },
        [attachmentType, skjemanummer, saveAttachment],
    );

    const deleteAttachment = useCallback((file: Attachment) => {
        setAttachments((currentAttachments) => currentAttachments.filter((a) => a.filename !== file.filename));
    }, []);

    const uploadedAttachments = useMemo(() => attachments.filter((a) => !a.error), [attachments]);
    const failedAttachments = useMemo(() => attachments.filter((a) => !!a.error), [attachments]);

    return (
        <UiIntlProvider>
            <VStack gap="6">
                <AttachmentList attachments={uploadedAttachments} showFileSize={true} onDelete={deleteAttachment} />
                <FileInput
                    accept={VALID_EXTENSIONS.join(', ')}
                    onFilesSelect={saveFiles}
                    hasUplodedAttachements={uploadedAttachments.length > 0}
                    multiple={multiple}
                />
                <FailedAttachmentList failedAttachments={failedAttachments} onDelete={deleteAttachment} />
            </VStack>
        </UiIntlProvider>
    );
};

export default FileUploader;
