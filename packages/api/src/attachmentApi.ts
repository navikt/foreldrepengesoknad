import axios from 'axios';
import { Attachment } from '@navikt/fp-types';

export const attachmentApi = axios.create();

const getSaveAttachment =
    (restApiUrl: string, type: 'foreldrepenger' | 'svangerskapspenger' | 'engangsstonad') =>
    (attachment: Attachment) => {
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

        const url = `${restApiUrl}/storage/${type}/vedlegg`;
        return attachmentApi.post(url, formData, config);
    };

export default getSaveAttachment;
