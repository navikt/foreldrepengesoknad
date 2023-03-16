import { Søkerinfo } from 'app/types/Søkerinfo';
import Kvittering from 'app/types/Kvittering';
import { FetchError } from 'app/types/FetchState';
import SøknadDTO from '../../types/Søknad';

export enum ApiActionTypes {
    'GET_SØKERINFO_REQUEST' = 'getSøkerInfoRequest',
    'GET_SØKERINFO_SUCCESS' = 'getSøkerInfoSuccess',
    'GET_SØKERINFO_FAILURE' = 'getSøkerInfoFailure',
    'SEND_SØKNAD_REQUEST' = 'sendSøknadRequest',
    'SEND_SØKNAD_SUCCESS' = 'sendSøknadSuccess',
    'SEND_SØKNAD_FAILURE' = 'sendSøknadFailure',
}

export interface GetSøkerinfoRequest {
    type: ApiActionTypes.GET_SØKERINFO_REQUEST;
}

export interface GetSøkerinfoSuccess {
    type: ApiActionTypes.GET_SØKERINFO_SUCCESS;
    payload: {
        søkerinfo: Søkerinfo;
    };
}

export interface GetSøkerinfoFailure {
    type: ApiActionTypes.GET_SØKERINFO_FAILURE;
    payload: {
        error: FetchError;
    };
}

export interface SendSøknadRequest {
    type: ApiActionTypes.SEND_SØKNAD_REQUEST;
    payload: {
        søknad: SøknadDTO;
    };
}

export interface SendSøknadSuccess {
    type: ApiActionTypes.SEND_SØKNAD_SUCCESS;
    payload: {
        kvittering: Kvittering;
    };
}

export interface SendSøknadFailure {
    type: ApiActionTypes.SEND_SØKNAD_FAILURE;
    payload: {
        error: FetchError;
    };
}

type ApiAction =
    | GetSøkerinfoRequest
    | GetSøkerinfoSuccess
    | GetSøkerinfoFailure
    | SendSøknadRequest
    | SendSøknadSuccess
    | SendSøknadFailure;

export default ApiAction;
