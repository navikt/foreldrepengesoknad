import ky, { HTTPError, TimeoutError } from 'ky';

import { Attachment } from '@navikt/fp-types';

type ProblemDetailsErrorKode =
    | 'IKKE_TILGANG'
    | 'DUPLIKAT_FORSENDELSE'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING';

type GenerelleErrorKoder = 'TIMEOUT' | 'SERVER_ERROR';

type UploadError = {
    success: false;
    feilKode: ProblemDetailsErrorKode | GenerelleErrorKoder;
};

type UploadSuccess = {
    success: true;
    data: string;
};

type UploadResult = UploadSuccess | UploadError;

// TODO (TOR) Midlertidig funksjon til alle apps er over på Fetch og FileUploader kan oppdaterast
export const getSaveAttachmentFetch =
    (sti: string) =>
    async (attachment: Attachment): Promise<UploadResult> => {
        const formData = new FormData();
        formData.append('id', attachment.id);
        formData.append('vedlegg', attachment.file, attachment.filename);

        try {
            const response = await ky.post<string>(sti, {
                body: formData,
                timeout: 1000 * 30,
            });
            return {
                success: true,
                data: await response.json(),
            };
        } catch (error) {
            if (error instanceof TimeoutError) {
                return {
                    success: false,
                    feilKode: 'TIMEOUT',
                };
            }

            if (error instanceof HTTPError) {
                const status = error.response.status;

                if (status >= 400 && status < 500) {
                    try {
                        return await error.response.json<UploadError>();
                    } catch {
                        return {
                            success: false,
                            feilKode: 'SERVER_ERROR',
                        };
                    }
                }

                if (status >= 500) {
                    return {
                        success: false,
                        feilKode: 'SERVER_ERROR',
                    };
                }
            }

            throw error;
        }
    };
