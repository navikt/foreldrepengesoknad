import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { PersonPartial } from '../../../types/Person';
import { AppState } from '../../reducers';

export function getSøkerinfo(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO_REQUEST
    };
}

export function sendSøknad(søknad: Søknad): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD_REQUEST,
        søknad
    };
}

export function updatePerson(payload: PersonPartial): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_PERSON,
        payload
    };
}

export function saveAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE
    };
}

export function saveAppStateSuccess(): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE_SUCCESS
    };
}

// tslint:disable-next-line:no-any
export function saveAppStateFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE_FAILED,
        error
    };
}

export function getAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE
    };
}

export function getAppStateSuccess(appState: AppState): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE_SUCCESS,
        appState
    };
}

export function getAppStateFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE_FAILED,
        error
    };
}

export default {
    getSøkerinfo,
    sendSøknad,
    updatePerson,
    getAppState,
    saveAppState
};
