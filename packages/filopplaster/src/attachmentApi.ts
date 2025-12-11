import ky, { HTTPError, TimeoutError } from 'ky';

import { Attachment, AttachmentUploadError, AttachmentUploadSuccess } from '@navikt/fp-types';

export const getSaveAttachmentFetch = async ({
    uploadPath,
    timeout = 1000 * 60 * 3,
    attachment,
}: {
    uploadPath: string;
    timeout?: number;
    attachment: Attachment;
}) => {
    const formData = new FormData();
    formData.append('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);

    try {
        const response = await ky.post<string>(uploadPath, {
            body: formData,
            timeout, // Store vedlegg 10MB over dårlig nett kan ta så lang tid som 3 minutter
        });
        return {
            success: true,
            data: await response.json<string>(),
        } satisfies AttachmentUploadSuccess;
    } catch (error) {
        return handleUploadError(error);
    }
};

const handleHTTPError = async (error: HTTPError): Promise<AttachmentUploadError> => {
    const status = error.response.status;

    if (status >= 400 && status < 500) {
        try {
            return await error.response.json<AttachmentUploadError>();
        } catch {
            return {
                success: false,
                feilKode: 'SERVER_ERROR',
            };
        }
    }

    return {
        success: false,
        feilKode: 'SERVER_ERROR',
    };
};

const handleUploadError = async (error: unknown): Promise<AttachmentUploadError> => {
    if (error instanceof TimeoutError) {
        return {
            success: false,
            feilKode: 'TIMEOUT',
        };
    }

    if (error instanceof HTTPError) {
        return handleHTTPError(error);
    }

    throw error;
};
