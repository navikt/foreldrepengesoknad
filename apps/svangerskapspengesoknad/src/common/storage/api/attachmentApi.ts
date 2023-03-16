import Environment from 'app/Environment';
import { Attachment } from '../attachment/types/Attachment';
import axios from 'axios';

function saveAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true,
        timeout: 30 * 1000,
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    const formData = new FormData();
    formData.append('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);

    const url = `${Environment.REST_API_URL}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

function deleteAttachment(attachment: Attachment) {
    const config = {
        timeout: 15 * 1000,
        withCredentials: true,
    };
    const url = `${Environment.REST_API_URL}/storage/vedlegg/${attachment.id}`;
    return axios.delete(url, config);
}

const AttachmentApi = { saveAttachment, deleteAttachment };

export default AttachmentApi;
