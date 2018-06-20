import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { PersonPartial } from '../../../types/Person';

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

export function updatePerson(payload: PersonPartial): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_PERSON,
        payload
    };
}

export default { getPerson, sendSøknad, updatePerson };
