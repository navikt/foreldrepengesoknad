import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { AppState } from '../redux/reducers';
import { storageParser } from '../util/storage/parser';

const apiBaseUrl = Environment.REST_API_URL;

function getPerson() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
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

    const url = `${apiBaseUrl}/soknad`;
    return axios.post(url, formData, {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;'
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
    const { søknad, common, summary } = state;
    return axios.post(
        url,
        { søknad, common, summary },
        { withCredentials: true }
    );
}

function deleteStoredAppState() {
    const url = `${apiBaseUrl}/storage`;
    return axios.delete(url, { withCredentials: true });
}

const Api = {
    getPerson,
    sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState
};

export default Api;
