import axios from 'axios';

function getPerson() {
    const endpoint = (window as any).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

const Api = { getPerson };

export default Api;
