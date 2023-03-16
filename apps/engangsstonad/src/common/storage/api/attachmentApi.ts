import { Attachment } from '../attachment/types/Attachment';
import axios from 'axios';

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

    const url = `${(window as any).REST_API_URL}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

const AttachmentApi = { saveAttachment };

export default AttachmentApi;
