import axios from 'axios';
import { SøknadForInnsending } from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { AppState } from '../redux/reducers';
import { storageParser } from '../util/storage/parser';
import { formaterDato } from 'common/util/datoUtils';
import { StorageKvittering } from '../types/StorageKvittering';
import createApiInterceptors from './apiInterceptor';
import AxiosInstance from './apiInterceptor';

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
    return AxiosInstance.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

const getSaker = () => {
    return AxiosInstance.get(`${apiBaseUrl}/innsyn/saker`, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

const getEksisterendeSak = (saksnummer: string) => {
    return AxiosInstance.get(`${apiBaseUrl}/innsyn/uttaksplan`, {
        timeout: 60 * 1000,
        withCredentials: true,
        params: { saksnummer }
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

    return AxiosInstance.get(`${uttakBaseUrl}/konto`, {
        timeout: 15 * 1000,
        params: urlParams
    });
}

function sendSøknad(søknad: SøknadForInnsending) {
    const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

    return AxiosInstance.post(url, søknad, {
        withCredentials: true,
        timeout: 30 * 1000,
        headers: {
            'content-type': 'application/json;'
        }
    });
}

function getStoredAppState() {
    const url = `${apiBaseUrl}/storage`;
    return AxiosInstance.get(url, {
        withCredentials: true,
        transformResponse: storageParser
    });
}

function storeAppState(state: Partial<AppState>) {
    const url = `${apiBaseUrl}/storage`;
    const { søknad, common } = state;
    return AxiosInstance.post(url, { søknad, common }, { withCredentials: true });
}

function deleteStoredAppState() {
    const url = `${apiBaseUrl}/storage`;
    return AxiosInstance.delete(url, { withCredentials: true });
}

function sendStorageKvittering(storageKvittering: StorageKvittering) {
    const url = `${apiBaseUrl}/storage/kvittering/foreldrepenger`;
    return AxiosInstance.post(url, storageKvittering, {
        withCredentials: true,
        timeout: 15 * 1000
    });
}

function getStorageKvittering() {
    const url = `${apiBaseUrl}/storage/kvittering/foreldrepenger`;
    return AxiosInstance.get(url, {
        withCredentials: true,
        timeout: 15 * 1000
    });
}

const log = (error: any) => {
    return AxiosInstance.post('/log', error, {
        timeout: 15 * 1000,
        withCredentials: true,
        headers: {
            'content-type': 'application/json'
        }
    });
};

const Api = {
    getSøkerinfo,
    getSaker,
    getUttakskontoer,
    sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState,
    sendStorageKvittering,
    getStorageKvittering,
    getEksisterendeSak,
    log
};

export default Api;
