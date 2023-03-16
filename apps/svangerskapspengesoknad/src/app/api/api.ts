import axios from 'axios';
import Environment from 'app/Environment';

const apiBaseUrl = Environment.REST_API_URL;
const sendSøknadUrl = `${apiBaseUrl}/soknad`;

export function getAxiosInstance() {
    return axios;
}

export function getSøkerinfo() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true,
    });
}

export function sendSøknad(søknad: any) {
    return axios.post(sendSøknadUrl, søknad, {
        withCredentials: true,
        headers: {
            'content-type': 'application/json;',
        },
    });
}
