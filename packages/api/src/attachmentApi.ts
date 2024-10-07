import { AxiosInstance } from 'axios';
import ky from 'ky';

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

        const response = await ky.post(`${publicPath}/rest/storage/${type}/vedlegg`, {
            body: formData,
        });
        return {
            headers: {
                location: response.headers.get('Location'),
            },
            data: await response.text(),
        };
    };
