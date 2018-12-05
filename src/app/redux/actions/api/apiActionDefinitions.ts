import { ApiStatePartial } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';
import { History } from 'history';
import { MissingAttachment } from '../../../types/MissingAttachment';

export enum ApiActionKeys {
    'GET_SØKERINFO' = 'getSøkerinfo',
    'GET_SAKER' = 'getSaker',

    'GET_STORED_APP_STATE' = 'getStoredAppState',
    'DELETE_STORED_APP_STATE' = 'deleteStoredAppState',
    'STORE_APP_STATE' = 'storeAppState',

    'SEND_SØKNAD' = 'sendSøknad',

    'UPDATE_API' = 'updateApi',

    'GET_TILGJENGELIGE_STØNADSKONTOER' = 'getTilgjengeligeStønadskontoer',
    'GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG' = 'getTilgjengeligeStønadskontoerAndLagUttaksplanForslag',
    'GET_TILGJENGELIGE_STØNADSUKER' = 'GET_TILGJENGELIGE_STØNADSUKER',

    'GET_UTTAKSPLAN_FOR_SAK' = 'getUttaksplanForSak'
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

export interface GetInnsynUttaksplan {
    type: ApiActionKeys.GET_UTTAKSPLAN_FOR_SAK;
    saksnummer: string;
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

export interface GetStoredAppState {
    type: ApiActionKeys.GET_STORED_APP_STATE;
    history: History;
}

export interface DeleteStoredAppState {
    type: ApiActionKeys.DELETE_STORED_APP_STATE;
}

export interface StoreAppState {
    type: ApiActionKeys.STORE_APP_STATE;
}

export type ApiActionTypes =
    | DeleteStoredAppState
    | GetSøkerinfo
    | GetSaker
    | GetInnsynUttaksplan
    | GetStoredAppState
    | GetTilgjengeligeStønadskontoer
    | GetTilgjengeligeStønadskontoerAndLagUttaksplanForslag
    | GetTilgjengeligeStønadsuker
    | SendSøknad
    | StoreAppState
    | UpdateApi;
