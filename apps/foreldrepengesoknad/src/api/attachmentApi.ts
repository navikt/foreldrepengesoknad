import { Attachment } from '@navikt/fp-types';

import { AxiosInstanceAPI } from 'app/api/AxiosInstance';

function saveAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true,
        timeout: 45 * 1000,
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    const formData = new FormData();
    formData.append('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);
    return AxiosInstanceAPI().post('/rest/storage/foreldrepenger/vedlegg', formData, config);
}

const AttachmentApi = { saveAttachment };

export default AttachmentApi;
