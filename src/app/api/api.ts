import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { AppState } from '../redux/reducers';
import { storageParser } from '../util/storage/parser';
import { cleanUpSøknad } from '../util/søknad/cleanup';
import { formaterDato } from 'common/util/datoUtils';

export interface GetTilgjengeligeStønadskontoerParams {
    antallBarn: number;
    morHarRett: boolean;
    farHarRett: boolean;
    dekningsgrad: '100' | '80';
    familiehendelsesdato: Date;
    erFødsel: boolean;
    morHarAleneomsorg?: boolean;
    farHarAleneomsorg?: boolean;
}

const apiBaseUrl = Environment.REST_API_URL;
const uttakBaseUrl = Environment.UTTAK_API_URL;

function getSøkerinfo() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

function getUttakskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    const { antallBarn, farHarRett, morHarRett, dekningsgrad, familiehendelsesdato, erFødsel } = params;
    const url = `${uttakBaseUrl}/konto?erFodsel=${erFødsel}&farHarRett=${farHarRett}&morHarRett=${morHarRett}&dekningsgrad=${dekningsgrad}&antallBarn=${antallBarn}&familiehendelsesdato=${formaterDato(
        familiehendelsesdato,
        'YYYYMMDD'
    )}`;

    return axios.get(url, {
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
    getUttakskontoer,
    sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState
};

export default Api;
