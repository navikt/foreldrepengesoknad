import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { AppState } from '../redux/reducers';
import { storageParser } from '../util/storage/parser';
import { cleanUpSøknad } from '../util/søknad/cleanup';

const apiBaseUrl = Environment.REST_API_URL;

function getSøkerinfo() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

function sendSøknad(søknad: Søknad) {
    const url = `${apiBaseUrl}/soknad`;

    return axios.post(url, cleanUpSøknad(søknad), {
        withCredentials: true,
        headers: {
            'content-type': 'application/json;'
        }
    });
}

function getStoredAppState() {
    const url = `${apiBaseUrl}/storage`;
    return axios.get(url, {
        withCredentials: true,
        transformResponse: storageParser
    });
}

function storeAppState(state: AppState) {
    const url = `${apiBaseUrl}/storage`;
    const { søknad, common } = state;
    return axios.post(url, { søknad, common }, { withCredentials: true });
}

function deleteStoredAppState() {
    const url = `${apiBaseUrl}/storage`;
    return axios.delete(url, { withCredentials: true });
}

const Api = {
    getSøkerinfo,
    sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState
};

export default Api;
