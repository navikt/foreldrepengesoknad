import axios from 'axios';
import Søknad from '../types/søknad/Søknad';

function getPerson() {
    const endpoint = (window as any).REST_API_URL;
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

    const url = `${(window as any).REST_API_URL}/soknad`;
    return axios.post(url, formData, {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;'
        }
    });
}

const Api = { getPerson, sendSøknad };

export default Api;
