import Søknad from '../../../types/søknad/Søknad';
import { ApiStatePartial } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';

export enum ApiActionKeys {
    'GET_SØKERINFO' = 'getSøkerinfo',

    'GET_STORED_APP_STATE' = 'getStoredAppState',
    'DELETE_STORED_APP_STATE' = 'deleteStoredAppState',
    'STORE_APP_STATE' = 'storeAppState',

    'SEND_SØKNAD' = 'sendSøknad',

    'UPDATE_API' = 'updateApi',

    'GET_TILGJENGELIGE_STØNADSKONTOER' = 'getTilgjengeligeStønadskontoer'
}

interface UpdateApi {
    type: ApiActionKeys.UPDATE_API;
    payload: ApiStatePartial;
}

interface GetSøkerinfo {
    type: ApiActionKeys.GET_SØKERINFO;
}

export interface GetTilgjengeligeStønadskontoer {
    type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER;
    params: GetTilgjengeligeStønadskontoerParams;
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
    | DeleteStoredAppState
    | GetSøkerinfo
    | GetStoredAppState
    | GetTilgjengeligeStønadskontoer
    | SendSøknad
    | StoreAppState
    | UpdateApi;
