import Environment from 'app/Environment';
import { Attachment } from 'app/types/Attachment';
import getAxiosInstance from './apiInterceptor';

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

    const url = `${Environment.REST_API_URL}/storage/vedlegg`;
    return getAxiosInstance().post(url, formData, config);
}

const AttachmentApi = { saveAttachment };

export default AttachmentApi;
