import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';

export function getPerson(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON_REQUEST
    };
}

export function sendSøknad(søknad: Søknad): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD_REQUEST,
        søknad
    };
}

export function updatePerson(payload: any): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_PERSON,
        payload
    };
}

export default { getPerson, sendSøknad, updatePerson };
