import Søknad from '../../../types/søknad/Søknad';
import { ApiStatePartial } from '../../reducers/apiReducer';

export enum ApiActionKeys {
    'GET_SØKERINFO' = 'getSøkerinfo',

    'GET_STORED_APP_STATE' = 'getStoredAppState',
    'DELETE_STORED_APP_STATE' = 'deleteStoredAppState',
    'STORE_APP_STATE' = 'storeAppState',

    'SEND_SØKNAD' = 'sendSøknad',

    'UPDATE_API' = 'updateApi'
}

interface UpdateApi {
    type: ApiActionKeys.UPDATE_API;
    payload: ApiStatePartial;
}

interface GetSøkerinfo {
    type: ApiActionKeys.GET_SØKERINFO;
}

export interface SendSøknad {
    type: ApiActionKeys.SEND_SØKNAD;
    søknad: Søknad;
}

export interface GetStoredAppState {
    type: ApiActionKeys.GET_STORED_APP_STATE;
}

export interface DeleteStoredAppState {
    type: ApiActionKeys.DELETE_STORED_APP_STATE;
}

export interface StoreAppState {
    type: ApiActionKeys.STORE_APP_STATE;
}

export type ApiActionTypes =
    | GetSøkerinfo
    | SendSøknad
    | StoreAppState
    | GetStoredAppState
    | DeleteStoredAppState
    | UpdateApi;
