import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad, { Søknadsvedlegginfo } from '../../../types/søknad/Søknad';

export function getPerson(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON_REQUEST
    };
}

export function sendSøknad(
    søknad: Søknad,
    vedlegg: Søknadsvedlegginfo[]
): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD_REQUEST,
        søknad,
        vedlegg
    };
}

export default { getPerson, sendSøknad };
