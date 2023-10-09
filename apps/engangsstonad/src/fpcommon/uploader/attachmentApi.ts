import axios from 'axios';
import { Attachment } from './typer/Attachment';

export const attachmentApi = axios.create();

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
    return attachmentApi.post(url, formData, config);
}

const AttachmentApi = { saveAttachment };

export default AttachmentApi;
