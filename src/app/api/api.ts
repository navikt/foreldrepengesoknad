import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { Attachment } from '../types/Attachment';

function getPerson() {
    const endpoint = Environment.REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

function sendSøknad(søknad: Søknad) {
    const formData = new FormData();
    formData.append(
        'soknad',
        new Blob([JSON.stringify(søknad)], {
            type: 'application/json'
        })
    );

    const { vedlegg } = søknad;
    formData.append('vedlegg', vedlegg[0]);

    const url = `${Environment.REST_API_URL}/soknad`;
    return axios.post(url, formData, {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;'
        }
    });
}

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

const Api = { getPerson, sendSøknad, saveAttachment, deleteAttachment };

export default Api;
