import Person from '../../../types/Person';
import Søknad from '../../../types/søknad/Søknad';

export enum ApiActionKeys {
    'GET_PERSON_REQUEST' = 'getPersonRequest',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed',

    'SEND_SØKNAD_REQUEST' = 'sendSøknadRequest',
    'SEND_SØKNAD_SUCCESS' = 'sendSøknadSuccess',
    'SEND_SØKNAD_FAILED' = 'sendSøknadFailed',

    'SAVE_VEDLEGG' = 'saveVedlegg',
    'SAVE_VEDLEGG_SUCCESS' = 'saveVedleggSuccess',
    'SAVE_VEDLEGG_FAILED' = 'saveVedleggFailed'
}

interface GetPersonRequest {
    type: ApiActionKeys.GET_PERSON_REQUEST;
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_PERSON_SUCCESS;
    person: Person;
}

interface GetPersonFailed {
    type: ApiActionKeys.GET_PERSON_FAILED;
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

interface SaveVedlegg {
    type: ApiActionKeys.SAVE_VEDLEGG;
    vedlegg: File;
}

interface SaveVedleggSuccess {
    type: ApiActionKeys.SAVE_VEDLEGG_SUCCESS;
    uri: URL;
}

interface SaveVedleggFailed {
    type: ApiActionKeys.SAVE_VEDLEGG_FAILED;
    error: any;
}

export type ApiActionTypes =
    | GetPersonRequest
    | GetPersonSuccess
    | GetPersonFailed
    | SendSøknadRequest
    | SendSøknadSuccess
    | SendSøknadFailed
    | SaveVedlegg
    | SaveVedleggSuccess
    | SaveVedleggFailed;
