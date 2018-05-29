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

export function saveVedlegg(vedlegg: File): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_VEDLEGG,
        vedlegg
    };
}

export function saveVedleggSuccess(uri: URL): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_VEDLEGG_SUCCESS,
        uri
    };
}

export function saveVedleggFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_VEDLEGG_FAILED,
        error
    };
}

export default { getPerson, sendSøknad };
