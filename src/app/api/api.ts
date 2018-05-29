import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';

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

function saveVedlegg(vedlegg: File) {
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const formData = new FormData();
    formData.append('vedlegg', vedlegg);

    const url = `${Environment.REST_API_URL}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

const Api = { getPerson, sendSøknad, saveVedlegg };

export default Api;
