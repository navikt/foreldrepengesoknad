import Environment from 'app/Environment';
import { Attachment } from '../attachment/types/Attachment';
import axios from 'axios';

function saveAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const formData = new FormData();
    formData.append('vedlegg', attachment.file);

    const url = `${Environment.REST_API_URL}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

function deleteAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true
    };
    const url = `${Environment.REST_API_URL}/storage/vedlegg/${attachment.url}`;
    return axios.delete(url, config);
}

const AttachmentApi = { saveAttachment, deleteAttachment };

export default AttachmentApi;
