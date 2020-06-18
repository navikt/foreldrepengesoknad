import { ApiStatePartial } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';
import { History } from 'history';
import { MissingAttachment } from '../../../types/MissingAttachment';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

export enum ApiActionKeys {
    'GET_SØKERINFO' = 'getSøkerinfo',
    'GET_SAKER' = 'getSaker',
    'GET_EKSISTERENDE_SAK' = 'getEksisterendeSak',
    'GET_ANNEN_PART_SIN_SAK' = 'getAnnenPartSinSak',

    'GET_STORAGE_DATA' = 'getStorageData',
    'DELETE_STORED_APP_STATE' = 'deleteStoredAppState',
    'STORE_APP_STATE' = 'storeAppState',

    'SEND_SØKNAD' = 'sendSøknad',

    'UPDATE_API' = 'updateApi',

    'GET_TILGJENGELIGE_STØNADSKONTOER' = 'getTilgjengeligeStønadskontoer',
    'GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG' = 'getTilgjengeligeStønadskontoerAndLagUttaksplanForslag',
    'GET_TILGJENGELIGE_STØNADSUKER' = 'GET_TILGJENGELIGE_STØNADSUKER',

    'SEND_STORAGE_KVITTERING' = 'sendStorageKvittering',

    'FJERN_INAKTIVE_ARBEIDSFORHOLD' = 'fjernInaktiveArbeidsforhold',
}

interface UpdateApi {
    type: ApiActionKeys.UPDATE_API;
    payload: ApiStatePartial;
}

export interface GetSøkerinfo {
    type: ApiActionKeys.GET_SØKERINFO;
    history: History;
}

export interface GetSaker {
    type: ApiActionKeys.GET_SAKER;
}

export interface GetEksisterendeSak {
    type: ApiActionKeys.GET_EKSISTERENDE_SAK;
    saksnummer: string;
}

export interface GetAnnenPartsEksisterendeSak {
    type: ApiActionKeys.GET_ANNEN_PART_SIN_SAK;
}

export interface GetTilgjengeligeStønadskontoer {
    type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER;
    params: GetTilgjengeligeStønadskontoerParams;
    history: History;
}

export interface GetTilgjengeligeStønadsuker {
    type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSUKER;
    params: GetTilgjengeligeStønadskontoerParams;
}

export interface GetTilgjengeligeStønadskontoerAndLagUttaksplanForslag {
    type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG;
    params: GetTilgjengeligeStønadskontoerParams;
}

export interface SendSøknad {
    type: ApiActionKeys.SEND_SØKNAD;
    missingAttachments: MissingAttachment[];
    history: History;
}

export interface GetStorageData {
    type: ApiActionKeys.GET_STORAGE_DATA;
    history: History;
}

export interface DeleteStoredAppState {
    type: ApiActionKeys.DELETE_STORED_APP_STATE;
}

export interface StoreAppState {
    type: ApiActionKeys.STORE_APP_STATE;
}

export interface SendStorageKvittering {
    type: ApiActionKeys.SEND_STORAGE_KVITTERING;
}

export interface FjernInaktiveArbeidsforhold {
    type: ApiActionKeys.FJERN_INAKTIVE_ARBEIDSFORHOLD;
    aktiveArbeidsforhold: Arbeidsforhold[];
}

export type ApiActionTypes =
    | DeleteStoredAppState
    | GetSøkerinfo
    | GetSaker
    | GetEksisterendeSak
    | GetAnnenPartsEksisterendeSak
    | GetStorageData
    | GetTilgjengeligeStønadskontoer
    | GetTilgjengeligeStønadskontoerAndLagUttaksplanForslag
    | GetTilgjengeligeStønadsuker
    | SendSøknad
    | StoreAppState
    | UpdateApi
    | SendStorageKvittering
    | FjernInaktiveArbeidsforhold;
