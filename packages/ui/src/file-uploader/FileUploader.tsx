import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, FileObject, FileRejected, FileRejectionReason, FileUpload, VStack } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { AttachmentList } from './AttachmentList';
import { mapFileToAttachment } from './fileUtils';
import { FileUploadError } from './typer/FileUploadError';
import { FileUploaderAttachment } from './typer/FileUploaderAttachment';

const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
const MAX_FIL_STØRRELSE_MB = 16;
const MAX_FIL_STØRRELSE_BYTES = MAX_FIL_STØRRELSE_MB * 1024 * 1024;

// TODO typen som blir returnert er ikkje komplett. Ikkje dra inn ky-avhengighet her
type SaveAttachment = (attachment: Attachment) => Promise<{ headers: { location: string | null }; data: string }>;

const findUniqueAndSortSkjemanummer = (attachments: FileUploaderAttachment[]) => {
    return [...new Set(attachments.map((a) => a.attachmentData.skjemanummer))].sort((s1, s2) => s1.localeCompare(s2));
};

const getPendingAttachmentFromFile = (
    file: FileObject,
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer,
): FileUploaderAttachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummer);

    if (!file.error) {
        newAttachment.attachmentData.pending = true;
    }

    return newAttachment;
};

const uploadAttachment = async (attachment: Attachment, saveAttachment: SaveAttachment): Promise<void> => {
    try {
        const response = await saveAttachment(attachment);
        attachment.pending = false;
        attachment.url = response.headers.location; // TODELETE
        attachment.uploaded = true;
        attachment.uuid = response.data;
    } catch (error) {
        // TODO Burde få ut feilmelding frå backend og vise denne
        attachment.pending = false;

        // @ts-expect-error TODO Fix typing her (Mogleg  mykje av logikken her bør ligga inne i saveAttachment, så slepp ein da inn Axios her)
        if (error?.response?.status === 408) {
            attachment.error = FileUploadError.TIMEOUT;
        } else {
            attachment.error = FileUploadError.GENERAL;
        }
    }
};

const EMPTY_ATTACHMENT_LIST = [] as Attachment[];

const replaceAttachmentIfFound = (
    setAttachments: React.Dispatch<React.SetStateAction<FileUploaderAttachment[]>>,
    pendingAttachment: FileUploaderAttachment,
) => {
    setAttachments((currentAttachments) =>
        currentAttachments.map((currentAttachement) =>
            currentAttachement.attachmentData.filename === pendingAttachment.attachmentData.filename
                ? pendingAttachment
                : currentAttachement,
        ),
    );
};

const addOrReplaceAttachments = (
    setAttachments: React.Dispatch<React.SetStateAction<FileUploaderAttachment[]>>,
    allPendingAttachments: FileUploaderAttachment[],
) => {
    setAttachments((currentAttachments) => {
        const otherAttachments = currentAttachments.filter(
            (ca) => !allPendingAttachments.some((pa) => pa.attachmentData.filename === ca.attachmentData.filename),
        );
        return otherAttachments.concat(allPendingAttachments);
    });
};

const getErrorMessageMap = (intl: IntlShape): Record<FileRejectionReason | FileUploadError, string> => ({
    fileType: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Type' }),
    fileSize: intl.formatMessage(
        { id: 'FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Størrelse' },
        { maxStørrelse: MAX_FIL_STØRRELSE_MB },
    ),
    [FileUploadError.NO_DATA]: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.IngenData' }),
    [FileUploadError.GENERAL]: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.Opplasting.Feilet' }),
    [FileUploadError.TIMEOUT]: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.Timeout' }),
});

// Etter refresh lokalt og i dev så er file = {}, så dette må til for å hindra feil i Aksel-komponent
const createFileIfEmpty = (attachment: Attachment): File => {
    const file = attachment.file;
    if (!file || Object.keys(file).length === 0) {
        return {
            name: attachment.filename,
            size: attachment.filesize,
        } as File;
    }
    return file;
};

const convertToInternalFormat = (attachments: Attachment[]): FileUploaderAttachment[] => {
    return attachments.map((a) => ({
        attachmentData: a,
        fileObject: {
            file: createFileIfEmpty(a),
            error: a.error,
        },
    }));
};

interface Props {
    label: string;
    description?: ReactNode;
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    existingAttachments?: Attachment[];
    saveAttachment: SaveAttachment;
    multiple?: boolean;
    skjemanummerTextMap?: Record<Skjemanummer, string>;
}

export const FileUploader = ({
    label,
    description,
    existingAttachments = EMPTY_ATTACHMENT_LIST,
    updateAttachments,
    attachmentType,
    skjemanummer,
    saveAttachment,
    multiple = true,
    skjemanummerTextMap,
}: Props) => {
    const intl = useIntl();
    const errorMessageMap = getErrorMessageMap(intl);

    const [attachments, setAttachments] = useState(convertToInternalFormat(existingAttachments));

    useEffect(() => {
        const attachmentsWithoutError = attachments.filter((a) => !a.attachmentData.error && !a.fileObject.error);
        const successAttachments = attachmentsWithoutError
            .filter((a) => a.attachmentData.pending === false)
            .map((a) => a.attachmentData);
        const hasPendingUploads = attachmentsWithoutError.some((a) => a.attachmentData.pending === true);
        updateAttachments(successAttachments, hasPendingUploads);
    }, [attachments]);

    const saveFiles = useCallback(
        (files: FileObject[]) => {
            const uploadAttachments = async (allPendingAttachments: FileUploaderAttachment[]) => {
                for (const pendingAttachment of allPendingAttachments) {
                    await uploadAttachment(pendingAttachment.attachmentData, saveAttachment);
                    replaceAttachmentIfFound(setAttachments, pendingAttachment);
                }
            };

            const allPendingAttachments = files.map((file) =>
                getPendingAttachmentFromFile(file, attachmentType, skjemanummer),
            );
            addOrReplaceAttachments(setAttachments, allPendingAttachments);
            uploadAttachments(allPendingAttachments.filter((pa) => !pa.fileObject.error));
        },
        [attachmentType, skjemanummer, saveAttachment],
    );

    const deleteAttachment = useCallback((fileToRemove: FileObject) => {
        setAttachments((currentAttachments) => currentAttachments.filter((a) => a.fileObject !== fileToRemove));
    }, []);

    const uploadedAttachments = useMemo(
        () => attachments.filter((a) => !a.attachmentData.error && !a.fileObject.error),
        [attachments],
    );
    const failedAttachments = useMemo(
        () => attachments.filter((a) => !!a.attachmentData.error || !!a.fileObject.error),
        [attachments],
    );

    return (
        <VStack gap="6">
            <FileUpload.Dropzone
                label={label}
                description={
                    <VStack gap="2">
                        <BodyShort>
                            {description}
                            {description && ' '}
                            <FormattedMessage
                                id="FileInput.Vedlegg.Lovlige"
                                values={{ maxStørrelse: MAX_FIL_STØRRELSE_MB }}
                            />
                        </BodyShort>
                    </VStack>
                }
                accept={VALID_EXTENSIONS.join(', ')}
                maxSizeInBytes={MAX_FIL_STØRRELSE_BYTES}
                fileLimit={{ max: multiple ? 40 : 1, current: uploadedAttachments.length }}
                onSelect={saveFiles}
                validator={(file: File) => {
                    if (file.size === 0) {
                        return FileUploadError.NO_DATA;
                    }

                    return true;
                }}
            />
            {skjemanummerTextMap && uploadedAttachments.length > 0 && (
                <>
                    {findUniqueAndSortSkjemanummer(uploadedAttachments).map((skjemanr) => (
                        <AttachmentList
                            key={skjemanr}
                            headingText={intl.formatMessage(
                                { id: 'FileInput.Vedlegg.HeaderWithName' },
                                {
                                    length: uploadedAttachments.filter(
                                        (a) => a.attachmentData.skjemanummer === skjemanr,
                                    ).length,
                                    name: skjemanummerTextMap[skjemanr],
                                },
                            )}
                            attachments={uploadedAttachments.filter((a) => a.attachmentData.skjemanummer === skjemanr)}
                            deleteAttachment={deleteAttachment}
                        />
                    ))}
                </>
            )}
            {!skjemanummerTextMap && uploadedAttachments.length > 0 && (
                <AttachmentList
                    headingText={intl.formatMessage(
                        { id: 'FileInput.Vedlegg.Header' },
                        { length: uploadedAttachments.length },
                    )}
                    attachments={uploadedAttachments}
                    deleteAttachment={deleteAttachment}
                />
            )}
            {failedAttachments.length > 0 && (
                <AttachmentList
                    headingText={intl.formatMessage(
                        { id: 'FileInput.Vedlegg.WithErrors' },
                        { length: failedAttachments.length },
                    )}
                    attachments={failedAttachments}
                    deleteAttachment={deleteAttachment}
                    getErrorMessage={(rejectedAttachment: FileUploaderAttachment) =>
                        rejectedAttachment.attachmentData.error
                            ? errorMessageMap[rejectedAttachment.attachmentData.error as FileUploadError]
                            : errorMessageMap[
                                  (rejectedAttachment.fileObject as FileRejected).reasons[0] as FileRejectionReason
                              ]
                    }
                />
            )}
        </VStack>
    );
};
