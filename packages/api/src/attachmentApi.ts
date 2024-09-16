import { AxiosInstance } from 'axios';

import { Attachment } from '@navikt/fp-types';

const getSaveAttachment =
    (axiosInstance: AxiosInstance, type: 'foreldrepenger' | 'svangerskapspenger' | 'engangsstonad') =>
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
        return axiosInstance.post(`/rest/storage/${type}/vedlegg`, formData, config);
    };

export default getSaveAttachment;
