import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import { ApiStatePartial } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';
import { History } from 'history';
import { MissingAttachment } from '../../../types/MissingAttachment';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

export function getSøkerinfo(history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO,
        history,
    };
}

export function getSaker(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SAKER,
    };
}

export function getEksisterendeSak(saksnummer: string): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_EKSISTERENDE_SAK,
        saksnummer,
    };
}

export function sendSøknad(missingAttachments: MissingAttachment[], history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SØKNAD,
        missingAttachments,
        history,
    };
}

export function getStorageData(history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STORAGE_DATA,
        history,
    };
}

export function getTilgjengeligeStønadskontoer(
    params: GetTilgjengeligeStønadskontoerParams,
    history: History
): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER,
        params,
        history,
    };
}

export function getTilgjengeligeStønadsuker(params: GetTilgjengeligeStønadskontoerParams): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSUKER,
        params,
    };
}

export function getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
    params: GetTilgjengeligeStønadskontoerParams
): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG,
        params,
    };
}

export function deleteStoredAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.DELETE_STORED_APP_STATE,
    };
}

export function storeAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.STORE_APP_STATE,
    };
}

export function updateApi(payload: ApiStatePartial): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        payload,
    };
}

export function sendStorageKvittering(): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_STORAGE_KVITTERING,
    };
}

export function fjernInaktiveArbeidsforhold(aktiveArbeidsforhold: Arbeidsforhold[]): ApiActionTypes {
    return {
        type: ApiActionKeys.FJERN_INAKTIVE_ARBEIDSFORHOLD,
        aktiveArbeidsforhold,
    };
}

const getSakForAnnenPart = () => ({
    type: ApiActionKeys.GET_ANNEN_PART_SIN_SAK,
});

export default {
    getSøkerinfo,
    getSaker,
    getEksisterendeSak,
    sendSøknad,
    getStorageData,
    deleteStoredAppState,
    storeAppState,
    getTilgjengeligeStønadskontoer,
    getTilgjengeligeStønadskonterAndLagUttaksplanForslag,
    getTilgjengeligeStønadsuker,
    updateApi,
    sendStorageKvittering,
    fjernInaktiveArbeidsforhold,
    getSakForAnnenPart,
};
