import ky from 'ky';

import { Attachment } from '@navikt/fp-types';

// TODO (TOR) Midlertidig funksjon til alle apps er over på Fetch og FileUploader kan oppdaterast
export const getSaveAttachmentFetch = (sti: string) => async (attachment: Attachment) => {
    const formData = new FormData();
    formData.append('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);

    const response = await ky.post<string>(sti, {
        body: formData,
        timeout: 1000 * 60 * 3, // Store vedlegg 10MB over dårlig nett kan ta så lang tid som 3 minutter
    });

    return {
        data: await response.json(),
    };
};
