import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { Attachment } from 'storage/attachment/types/Attachment';

export function getPerson(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON_REQUEST
    };
}

export function sendSøknad(
    søknad: Søknad,
    vedlegg: Attachment[]
): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD_REQUEST,
        søknad,
        vedlegg
    };
}

export default { getPerson, sendSøknad };
