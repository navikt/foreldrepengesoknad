import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { AppState } from '../redux/reducers';
import { storageParser } from '../util/storage/parser';
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
    startdatoUttak: Date;
}

const apiBaseUrl = Environment.REST_API_URL;
const uttakBaseUrl = Environment.UTTAK_API_URL;
const sendSøknadUrl = `${apiBaseUrl}/soknad`;
const sendEndringssøknadUrl = `${sendSøknadUrl}/endre`;

function getSøkerinfo() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

const getSaker = () => {
    return axios.get(`${apiBaseUrl}/saker`, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

function getUttakskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    const {
        antallBarn,
        farHarRett,
        morHarRett,
        dekningsgrad,
        familiehendelsesdato,
        erFødsel,
        morHarAleneomsorg,
        farHarAleneomsorg,
        startdatoUttak
    } = params;

    const urlParams = {
        erFodsel: erFødsel,
        farHarRett,
        morHarRett,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        dekningsgrad,
        antallBarn,
        familiehendelsesdato: formaterDato(familiehendelsesdato, 'YYYYMMDD'),
        startdatoUttak: formaterDato(startdatoUttak, 'YYYYMMDD')
    };

    return axios.get(`${uttakBaseUrl}/konto`, {
        timeout: 15 * 1000,
        params: urlParams
    });
}

function sendSøknad(søknad: Søknad) {
    const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

    return axios.post(url, søknad, {
        withCredentials: true,
        timeout: 30 * 1000,
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

function storeAppState(state: Partial<AppState>) {
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
    getSaker,
    getUttakskontoer,
    sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState
};

export default Api;
