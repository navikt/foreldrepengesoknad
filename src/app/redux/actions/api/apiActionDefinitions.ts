import { PersonPartial } from '../../../types/Person';
import Søknad from '../../../types/søknad/Søknad';
import { ApiStatePartial } from '../../reducers/apiReducer';

export enum ApiActionKeys {
    'GET_APP_STATE' = 'getAppState',
    'GET_SØKERINFO' = 'getSøkerinfo',

    'SAVE_APP_STATE' = 'saveAppState',
    'SEND_SØKNAD' = 'sendSøknad',

    'UPDATE_PERSON' = 'updatePerson',

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

interface UpdatePerson {
    type: ApiActionKeys.UPDATE_PERSON;
    payload: PersonPartial;
}

export interface SaveAppState {
    type: ApiActionKeys.SAVE_APP_STATE;
}

export interface GetAppState {
    type: ApiActionKeys.GET_APP_STATE;
}

export type ApiActionTypes =
    | GetSøkerinfo
    | SendSøknad
    | UpdatePerson
    | SaveAppState
    | GetAppState
    | UpdateApi;
