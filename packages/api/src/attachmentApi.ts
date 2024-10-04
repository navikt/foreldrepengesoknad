import { AxiosInstance } from 'axios';

import { Attachment } from '@navikt/fp-types';

export const getSaveAttachment =
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

// TODO (TOR) Midlertidig funksjon til alle apps er over på Fetch og FileUploader kan oppdaterast
export const getSaveAttachmentFetch =
    (publicPath: string, type: 'foreldrepenger' | 'svangerskapspenger' | 'engangsstonad') =>
    async (attachment: Attachment) => {
        const formData = new FormData();
        formData.append('id', attachment.id);
        formData.append('vedlegg', attachment.file, attachment.filename);

        const response = await fetch(`${publicPath}/rest/storage/${type}/vedlegg`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        return {
            headers: {
                location: response.headers.get('Location'),
            },
            data,
        };
    };
