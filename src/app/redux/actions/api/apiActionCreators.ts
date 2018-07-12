import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { PersonPartial } from '../../../types/Person';
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

export function getAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE
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
    updatePerson,
    getAppState,
    updateApi,
    saveAppState
};
