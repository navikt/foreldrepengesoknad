import { type ReactNode, useEffect, useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, FileUpload, VStack } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentError } from '@navikt/fp-types';

import { AttachmentList } from './AttachmentList';
import { FileUploaderAttachment } from './FileUploaderAttachment';
import {
    MAX_FIL_STØRRELSE_BYTES,
    MAX_FIL_STØRRELSE_MB,
    VALID_EXTENSIONS,
    getAttachmentErrorMessage,
    getErrorMessageMap,
    groupAttachmentsBySkjemanummer,
} from './fileUploaderUtils';
import { useFileUploader } from './useFileUploader';

interface AttachmentGroup {
    key: string;
    headingText: string;
    attachments: FileUploaderAttachment[];
}

interface Props {
    label: string;
    description?: ReactNode;
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    existingAttachments?: Attachment[];
    multiple?: boolean;
    skjemanummerTextMap?: Record<Skjemanummer, string>;
    uploadPath: string;
    timeout?: number; // Kun brukt for å sette custom timeout i test
}

export const FileUploader = ({
    label,
    description,
    existingAttachments = [],
    updateAttachments,
    attachmentType,
    skjemanummer,
    multiple = true,
    skjemanummerTextMap,
    uploadPath,
    timeout,
}: Props) => {
    const intl = useIntl();
    const updateAttachmentsRef = useRef(updateAttachments);
    const errorMessageMap = useMemo(() => getErrorMessageMap(intl), [intl]);

    const {
        saveFiles,
        deleteAttachment,
        acceptedAttachments,
        failedAttachments,
        successfulAttachments,
        hasPendingUploads,
    } = useFileUploader({
        existingAttachments,
        attachmentType,
        skjemanummer,
        uploadPath,
        timeout,
    });

    useEffect(() => {
        updateAttachmentsRef.current = updateAttachments;
    }, [updateAttachments]);

    useEffect(() => {
        updateAttachmentsRef.current(successfulAttachments, hasPendingUploads);
    }, [successfulAttachments, hasPendingUploads]);

    const acceptedGroups = useMemo<AttachmentGroup[]>(() => {
        if (acceptedAttachments.length === 0) {
            return [];
        }

        if (skjemanummerTextMap) {
            return groupAttachmentsBySkjemanummer(acceptedAttachments).map(([skjemanr, attachments]) => ({
                key: skjemanr,
                attachments,
                headingText: intl.formatMessage(
                    { id: 'FileInput.Vedlegg.HeaderWithName' },
                    { length: attachments.length, name: skjemanummerTextMap[skjemanr] },
                ),
            }));
        }

        return [
            {
                key: 'all',
                attachments: acceptedAttachments,
                headingText: intl.formatMessage(
                    { id: 'FileInput.Vedlegg.Header' },
                    { length: acceptedAttachments.length },
                ),
            },
        ];
    }, [acceptedAttachments, skjemanummerTextMap, intl]);

    return (
        <VStack gap="space-24">
            <FileUpload.Dropzone
                label={label}
                description={
                    <VStack gap="space-8">
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
                fileLimit={{ max: multiple ? 40 : 1, current: acceptedAttachments.length }}
                onSelect={saveFiles}
                validator={(file: File) => (file.size === 0 ? ('NO_DATA' satisfies AttachmentError) : true)}
            />
            {acceptedGroups.map((group) => (
                <AttachmentList
                    key={group.key}
                    headingText={group.headingText}
                    attachments={group.attachments}
                    deleteAttachment={deleteAttachment}
                />
            ))}
            {failedAttachments.length > 0 && (
                <AttachmentList
                    headingText={intl.formatMessage(
                        { id: 'FileInput.Vedlegg.WithErrors' },
                        { length: failedAttachments.length },
                    )}
                    attachments={failedAttachments}
                    deleteAttachment={deleteAttachment}
                    getErrorMessage={(attachment) => getAttachmentErrorMessage(attachment, errorMessageMap)}
                />
            )}
        </VStack>
    );
};
