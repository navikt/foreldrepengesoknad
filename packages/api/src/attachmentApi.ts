import ky, { HTTPError } from 'ky';

import { Attachment } from '@navikt/fp-types';

type UploadError = {
    success: false;
    feilkode:
        | 'IKKE_TILGANG'
        | 'DUPLIKAT_FORSENDELSE'
        | 'MELLOMLAGRING'
        | 'MELLOMLAGRING_VEDLEGG'
        | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
        | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
        | 'KRYPTERING_MELLOMLAGRING';
    status: number;
    message: string;
};
// TODO (TOR) Midlertidig funksjon til alle apps er over på Fetch og FileUploader kan oppdaterast
export const getSaveAttachmentFetch = (sti: string) => async (attachment: Attachment) => {
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
        if (error instanceof HTTPError) {
            return error.response.json<UploadError>();
        }

        throw error;
    }
};
