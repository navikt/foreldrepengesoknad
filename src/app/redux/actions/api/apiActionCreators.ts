import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Søknad from '../../../types/søknad/Søknad';
import { ApiStatePartial } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';
import { History } from 'history';

export function getSøkerinfo(history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO,
        history
    };
}

export function sendSøknad(søknad: Søknad, history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD,
        søknad,
        history
    };
}

export function getStoredAppState(history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STORED_APP_STATE,
        history
    };
}

export function getTilgjengeligeStønadskonter(
    params: GetTilgjengeligeStønadskontoerParams,
    history: History
): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER,
        params,
        history
    };
}

export function getTilgjengeligeStønadsuker(params: GetTilgjengeligeStønadskontoerParams): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSUKER,
        params
    };
}

export function getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
    params: GetTilgjengeligeStønadskontoerParams
): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG,
        params
    };
}

export function deleteStoredAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.DELETE_STORED_APP_STATE
    };
}

export function storeAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.STORE_APP_STATE
    };
}

export function updateApi(payload: ApiStatePartial): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        payload
    };
}

export default {
    getSøkerinfo,
    sendSøknad,
    getStoredAppState,
    deleteStoredAppState,
    storeAppState,
    getTilgjengeligeStønadskonter,
    getTilgjengeligeStønadskonterAndLagUttaksplanForslag,
    getTilgjengeligeStønadsuker,
    updateApi
};
