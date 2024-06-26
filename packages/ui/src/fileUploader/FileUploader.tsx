import { useCallback, useEffect, useMemo, useState } from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { mapFileToAttachment } from './fileUtils';
import FileInput from './input/FileInput';
import AttachmentList from './liste/AttachmentList';
import FailedAttachmentList from './liste/FailedAttachmentList';
import { FileUploadError } from './typer/FileUploadError';

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_MB = 16;
const MAX_FIL_STØRRELSE_BYTES = MAX_FIL_STØRRELSE_MB * 1024 * 1024;

// TODO Fjern any her utan å måtte dra inn axios i denne pakka
type SaveAttachment = (attachment: Attachment) => Promise<any>;

const findUniqueAndSortSkjemanummer = (attachments: Attachment[]) => {
    return [...new Set(attachments.map((a) => a.skjemanummer))].sort((s1, s2) => s1.localeCompare(s2));
};

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
    return filesizeInB <= MAX_FIL_STØRRELSE_BYTES;
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
        attachment.url = response.headers.location; // TODELETE
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

const replaceAttachmentIfFound = (
    setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>,
    pendingAttachment: Attachment,
) => {
    setAttachments((currentAttachments) =>
        currentAttachments.map((currentAttachement) =>
            currentAttachement.filename === pendingAttachment.filename ? pendingAttachment : currentAttachement,
        ),
    );
};

const addOrReplaceAttachments = (
    setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>,
    allPendingAttachments: Attachment[],
) => {
    setAttachments((currentAttachments) => {
        const otherAttachments = currentAttachments.filter(
            (ca) => !allPendingAttachments.some((pa) => pa.filename === ca.filename),
        );
        return otherAttachments.concat(allPendingAttachments);
    });
};

export interface Props {
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    existingAttachments?: Attachment[];
    saveAttachment: SaveAttachment;
    multiple?: boolean;
    skjemanummerTextMap?: Record<Skjemanummer, string>;
}

const FileUploader: React.FunctionComponent<Props> = ({
    existingAttachments = EMPTY_ATTACHMENT_LIST,
    updateAttachments,
    attachmentType,
    skjemanummer,
    saveAttachment,
    multiple = true,
    skjemanummerTextMap,
}) => {
    const [attachments, setAttachments] = useState(existingAttachments);

    useEffect(() => {
        const successAttachments = attachments.filter((a) => !a.error && a.pending === false);
        const hasPendingUploads = attachments.some((a) => !a.error && a.pending === true);
        updateAttachments(successAttachments, hasPendingUploads);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attachments]);

    const saveFiles = useCallback(
        (files: File[]) => {
            const uploadAttachments = async (allPendingAttachments: Attachment[]) => {
                for (const pendingAttachment of allPendingAttachments) {
                    await uploadAttachment(pendingAttachment, saveAttachment);
                    replaceAttachmentIfFound(setAttachments, pendingAttachment);
                }
            };

            const allPendingAttachments = files.map((file) =>
                getPendingAttachmentFromFile(file, attachmentType, skjemanummer),
            );
            addOrReplaceAttachments(setAttachments, allPendingAttachments);
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
        <VStack gap="6">
            {skjemanummerTextMap && attachments.length > 0 && (
                <>
                    {findUniqueAndSortSkjemanummer(attachments).map((skjemanr) => (
                        <>
                            <Heading key={skjemanr} size="small" level="2">
                                {skjemanummerTextMap[skjemanr]}
                            </Heading>
                            <AttachmentList
                                attachments={uploadedAttachments.filter((a) => a.skjemanummer === skjemanr)}
                                showFileSize={true}
                                onDelete={deleteAttachment}
                            />
                        </>
                    ))}
                </>
            )}
            {!skjemanummerTextMap && (
                <AttachmentList attachments={uploadedAttachments} showFileSize={true} onDelete={deleteAttachment} />
            )}
            <FileInput
                accept={VALID_EXTENSIONS.join(', ')}
                onFilesSelect={saveFiles}
                hasUplodedAttachements={uploadedAttachments.length > 0}
                multiple={multiple}
            />
            <FailedAttachmentList failedAttachments={failedAttachments} onDelete={deleteAttachment} />
        </VStack>
    );
};

export default FileUploader;
