import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { ApiStatePartial } from '../../reducers/apiReducer';

export function getSøkerinfo(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO
    };
}

export function sendSøknad(søknad: Søknad): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD,
        søknad
    };
}

export function getStoredAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STORED_APP_STATE
    };
}

export function deleteStoredAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.DELETE_STORED_APP_STATE
    };
}

export function storeAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.STORE_APP_STATE
    };
}

export function updateApi(payload: ApiStatePartial): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        payload
    };
}

export default {
    getSøkerinfo,
    sendSøknad,
    getStoredAppState,
    deleteStoredAppState,
    storeAppState,
    updateApi
};
