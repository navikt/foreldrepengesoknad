import { IntlShape } from 'react-intl';

import { FileObject, FileRejected, FileRejectionReason } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentError } from '@navikt/fp-types';

import { FileUploaderAttachment } from './FileUploaderAttachment';
import { getSaveAttachmentFetch } from './attachmentApi.ts';
import { mapFileToAttachment } from './fileUtils';

export const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
export const MAX_FIL_STØRRELSE_MB = 16;
export const MAX_FIL_STØRRELSE_BYTES = MAX_FIL_STØRRELSE_MB * 1024 * 1024;

const isAccepted = (a: FileUploaderAttachment): boolean => !a.attachmentData.error && !a.fileObject.error;

export const isAcceptedAttachment = isAccepted;
export const isFailedAttachment = (a: FileUploaderAttachment): boolean => !isAccepted(a);

export const groupAttachmentsBySkjemanummer = (
    attachments: FileUploaderAttachment[],
): Array<[Skjemanummer, FileUploaderAttachment[]]> => {
    const grouped = new Map<Skjemanummer, FileUploaderAttachment[]>();

    for (const attachment of attachments) {
        const skjemanummer = attachment.attachmentData.skjemanummer;
        const existingGroup = grouped.get(skjemanummer);
        if (existingGroup) {
            existingGroup.push(attachment);
        } else {
            grouped.set(skjemanummer, [attachment]);
        }
    }

    return [...grouped.entries()].sort(([s1], [s2]) => s1.localeCompare(s2));
};

export const getPendingAttachmentFromFile = (
    file: FileObject,
    attachmentType: AttachmentType,
    skjemanummer: Skjemanummer,
): FileUploaderAttachment => {
    const newAttachment = mapFileToAttachment(file, attachmentType, skjemanummer);
    newAttachment.attachmentData.pending = !file.error;
    return newAttachment;
};

export const uploadAttachment = async (attachment: Attachment, uploadPath: string, timeout?: number): Promise<void> => {
    const response = await getSaveAttachmentFetch({ uploadPath, attachment, timeout });

    attachment.pending = false;
    if (response.success) {
        attachment.uploaded = true;
        attachment.uuid = response.data;
    } else {
        attachment.error = response.feilkode;
    }
};

// Etter refresh lokalt og i dev så er file = {}, så dette må til for å hindra feil i Aksel-komponent
const createFileIfEmpty = (attachment: Attachment): File => {
    const file = attachment.file;
    if (!file || Object.keys(file).length === 0) {
        return {
            name: attachment.filename,
            size: attachment.filesize ?? 0,
        } as File;
    }
    return file;
};

export const convertToInternalFormat = (attachments: Attachment[]): FileUploaderAttachment[] =>
    attachments.map((attachmentData) => {
        const hasError = attachmentData.error !== undefined;
        return {
            attachmentData,
            fileObject: hasError
                ? { file: createFileIfEmpty(attachmentData), error: true, reasons: [] }
                : { file: createFileIfEmpty(attachmentData), error: false },
        };
    });

export const getErrorMessageMap = (intl: IntlShape): Record<FileRejectionReason | AttachmentError, string> => {
    const serverError = intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.SERVER_ERROR' });
    const timeout = intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.TIMEOUT' });

    return {
        fileType: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.fileType' }),
        fileSize: intl.formatMessage(
            { id: 'FailedAttachment.Vedlegg.Feilmelding.fileSize' },
            { maxStørrelse: MAX_FIL_STØRRELSE_MB },
        ),
        NO_DATA: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.NO_DATA' }),

        // Timeout
        MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT: timeout,
        TIMEOUT: timeout,

        MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET: intl.formatMessage({
            id: 'FailedAttachment.Vedlegg.Feilmelding.MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET',
        }),
        DUPLIKAT_FORSENDELSE: intl.formatMessage({ id: 'FailedAttachment.Vedlegg.Feilmelding.DUPLIKAT_FORSENDELSE' }),

        // Mappes som generell feil
        DUPLIKAT_VEDLEGG: serverError,
        KRYPTERING_MELLOMLAGRING: serverError,
        IKKE_TILGANG: serverError,
        IKKE_FUNNET: serverError,
        GENERELL: serverError,
        VALIDERING: serverError,
        MELLOMLAGRING: serverError,
        MELLOMLAGRING_VEDLEGG: serverError,
        SERVER_ERROR: serverError,
    };
};

export const getAttachmentErrorMessage = (
    attachment: FileUploaderAttachment,
    errorMessageMap: Record<FileRejectionReason | AttachmentError, string>,
): string => {
    if (attachment.attachmentData.error) {
        return errorMessageMap[attachment.attachmentData.error];
    }
    const reason = (attachment.fileObject as FileRejected).reasons[0] as FileRejectionReason;
    return errorMessageMap[reason];
};
