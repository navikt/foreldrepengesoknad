import ky from 'ky';

import { Attachment } from '@navikt/fp-types';

// TODO (TOR) Midlertidig funksjon til alle apps er over på Fetch og FileUploader kan oppdaterast
export const getSaveAttachmentFetch = (sti: string) => async (attachment: Attachment) => {
    const formData = new FormData();
    formData.append('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);

    const response = await ky.post(sti, {
        body: formData,
    });

    return {
        headers: {
            location: response.headers.get('Location'),
        },
        data: await response.json(),
    };
};
