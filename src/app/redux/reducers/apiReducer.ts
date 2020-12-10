import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import { Kvittering } from '../../types/Kvittering';
import { Søkerinfo } from '../../types/søkerinfo';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import Sak from '../../types/søknad/Sak';
import { StorageKvittering } from '../../types/StorageKvittering';

export interface ApiState {
    søkerinfo?: Søkerinfo;
    sakForEndringssøknad?: Sak;
    sakUnderBehandling?: Sak;
    isLoadingInitialAppData: boolean;
    isLoadingSøkerinfo: boolean;
    isLoadingStoredAppState: boolean;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    isLoadingSaker: boolean;
    isLoadingEksisterendeSak: boolean;
    isLoadingSakForAnnenPart: boolean;
    sessionHasExpired: boolean;
    oppslagSakerFeilet?: boolean;
    oppslagEksisterendeSakFeilet?: boolean;
    oppslagSakForAnnenPartFeilet?: boolean;
    søknadSendingInProgress: boolean;
    søknadHasBeenReceived: boolean;
    stønadskontoer100: TilgjengeligStønadskonto[];
    stønadskontoer80: TilgjengeligStønadskonto[];
    kvittering?: Kvittering;
    søkerinfoLastetCounter: number;
    systemerIkkeTilgjengelig: boolean;
    storageKvittering?: StorageKvittering;
    innloggetSomAnnenForelder: boolean;
    påloggingsNivåLavereEnn4: boolean;
}

export type ApiStatePartial = Partial<ApiState>;

export const getDefaultApiState = (): ApiState => ({
    isLoadingInitialAppData: true,
    isLoadingSøkerinfo: false,
    isLoadingStoredAppState: false,
    isLoadingSakForAnnenPart: false,
    isLoadingTilgjengeligeStønadskontoer: false,
    isLoadingSaker: false,
    isLoadingEksisterendeSak: false,
    sessionHasExpired: false,
    søknadSendingInProgress: false,
    søknadHasBeenReceived: false,
    stønadskontoer100: [],
    stønadskontoer80: [],
    systemerIkkeTilgjengelig: false,
    søkerinfoLastetCounter: 0,
    innloggetSomAnnenForelder: false,
    påloggingsNivåLavereEnn4: false,
});

const apiReducer = (state = getDefaultApiState(), action: ApiActionTypes): ApiStatePartial => {
    switch (action.type) {
        case ApiActionKeys.UPDATE_API:
            return {
                ...state,
                ...action.payload,
            };
        case ApiActionKeys.GET_SØKERINFO:
            return {
                ...state,
                isLoadingSøkerinfo: true,
            };
        case ApiActionKeys.GET_STORAGE_DATA:
            return {
                ...state,
                isLoadingStoredAppState: true,
            };
        case ApiActionKeys.DELETE_STORED_APP_STATE:
            return {
                ...state,
                isLoadingStoredAppState: true,
            };
        case ApiActionKeys.FJERN_INAKTIVE_ARBEIDSFORHOLD:
            if (state.søkerinfo) {
                const aktiveArbeidsforhold = action.aktiveArbeidsforhold;

                return {
                    ...state,
                    søkerinfo: {
                        ...state.søkerinfo,
                        arbeidsforhold: aktiveArbeidsforhold,
                    },
                };
            } else {
                return {
                    ...state,
                };
            }

        default:
            return state;
    }
};

export default apiReducer;
