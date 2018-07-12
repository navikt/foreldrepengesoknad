import Person, { PersonPartial } from '../../../types/Person';
import Søknad from '../../../types/søknad/Søknad';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import { AppState } from '../../reducers';

export enum ApiActionKeys {
    'GET_SØKERINFO_REQUEST' = 'getSøkerinfoRequest',
    'GET_SØKERINFO_SUCCESS' = 'getSøkerinfoSuccess',
    'GET_SØKERINFO_FAILED' = 'getSøkerinfoFailed',

    'SEND_SØKNAD_REQUEST' = 'sendSøknadRequest',
    'SEND_SØKNAD_SUCCESS' = 'sendSøknadSuccess',
    'SEND_SØKNAD_FAILED' = 'sendSøknadFailed',

    'SAVE_APP_STATE' = 'saveAppState',
    'SAVE_APP_STATE_SUCCESS' = 'saveAppStateSuccess',
    'SAVE_APP_STATE_FAILED' = 'saveAppStateFailed',

    'GET_APP_STATE' = 'getAppState',
    'GET_APP_STATE_SUCCESS' = 'getAppStateSuccess',
    'GET_APP_STATE_FAILED' = 'getAppStateFailed',

    'UPDATE_PERSON' = 'updatePerson'
}

interface GetSøkerinfoRequest {
    type: ApiActionKeys.GET_SØKERINFO_REQUEST;
}

interface GetSøkerinfoSuccess {
    type: ApiActionKeys.GET_SØKERINFO_SUCCESS;
    person: Person;
    arbeidsforhold: Arbeidsforhold;
}

interface GetSøkerinfoFailed {
    type: ApiActionKeys.GET_SØKERINFO_FAILED;
    error: any;
}

export interface SendSøknadRequest {
    type: ApiActionKeys.SEND_SØKNAD_REQUEST;
    søknad: Søknad;
}

interface SendSøknadSuccess {
    type: ApiActionKeys.SEND_SØKNAD_SUCCESS;
    response: any;
}

interface SendSøknadFailed {
    type: ApiActionKeys.SEND_SØKNAD_FAILED;
    error: any;
}

interface UpdatePerson {
    type: ApiActionKeys.UPDATE_PERSON;
    payload: PersonPartial;
}

export interface SaveAppState {
    type: ApiActionKeys.SAVE_APP_STATE;
}

interface SaveAppStateSuccess {
    type: ApiActionKeys.SAVE_APP_STATE_SUCCESS;
}

interface SaveAppStateFailed {
    type: ApiActionKeys.SAVE_APP_STATE_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export interface GetAppState {
    type: ApiActionKeys.GET_APP_STATE;
}

export interface GetAppStateSuccess {
    type: ApiActionKeys.GET_APP_STATE_SUCCESS;
    appState: AppState;
}

interface GetAppStateFailed {
    type: ApiActionKeys.GET_APP_STATE_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export type ApiActionTypes =
    | GetSøkerinfoRequest
    | GetSøkerinfoSuccess
    | GetSøkerinfoFailed
    | SendSøknadRequest
    | SendSøknadSuccess
    | SendSøknadFailed
    | UpdatePerson
    | SaveAppState
    | SaveAppStateSuccess
    | SaveAppStateFailed
    | GetAppState
    | GetAppStateSuccess
    | GetAppStateFailed;
