import axios from 'axios';
import { Attachment } from './typer/Attachment';

function saveAttachment(attachment: Attachment, restApiUrl: string) {
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

    const url = `${restApiUrl}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

const AttachmentApi = { saveAttachment };

export default AttachmentApi;
