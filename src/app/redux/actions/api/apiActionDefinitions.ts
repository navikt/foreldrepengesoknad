import Person, { PersonPartial } from '../../../types/Person';
import Søknad from '../../../types/søknad/Søknad';
import Arbeidsforhold from '../../../types/Arbeidsforhold';

export enum ApiActionKeys {
    'GET_SØKERINFO_REQUEST' = 'getSøkerinfoRequest',
    'GET_SØKERINFO_SUCCESS' = 'getSøkerinfoSuccess',
    'GET_SØKERINFO_FAILED' = 'getSøkerinfoFailed',

    'SEND_SØKNAD_REQUEST' = 'sendSøknadRequest',
    'SEND_SØKNAD_SUCCESS' = 'sendSøknadSuccess',
    'SEND_SØKNAD_FAILED' = 'sendSøknadFailed',

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

export type ApiActionTypes =
    | GetSøkerinfoRequest
    | GetSøkerinfoSuccess
    | GetSøkerinfoFailed
    | SendSøknadRequest
    | SendSøknadSuccess
    | SendSøknadFailed
    | UpdatePerson;
