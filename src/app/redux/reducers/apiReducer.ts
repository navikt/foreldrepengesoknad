import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import { Kvittering } from '../../types/Kvittering';
import { Søkerinfo } from '../../types/søkerinfo';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import Sak from '../../types/søknad/Sak';

export interface ApiState {
    søkerinfo?: Søkerinfo;
    sakForEndringssøknad?: Sak;
    isLoadingInitialAppData: boolean;
    isLoadingSøkerinfo: boolean;
    isLoadingStoredAppState: boolean;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    isLoadingSaker: boolean;
    sessionHasExpired: boolean;
    oppslagSakerFeilet?: boolean;
    søknadSendingInProgress: boolean;
    søknadHasBeenReceived: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    kvittering?: Kvittering;
    dekningsgrad100AntallUker?: number;
    dekningsgrad80AntallUker?: number;
    fellesPeriodeUkerDekningsgrad100?: number;
    fellesPeriodeUkerDekningsgrad80?: number;
}

export type ApiStatePartial = Partial<ApiState>;

export const getDefaultApiState = (): ApiState => ({
    isLoadingInitialAppData: true,
    isLoadingSøkerinfo: false,
    isLoadingStoredAppState: false,
    isLoadingTilgjengeligeStønadskontoer: false,
    isLoadingSaker: false,
    sessionHasExpired: false,
    søknadSendingInProgress: false,
    søknadHasBeenReceived: false,
    tilgjengeligeStønadskontoer: []
});

const apiReducer = (state = getDefaultApiState(), action: ApiActionTypes): ApiStatePartial => {
    switch (action.type) {
        case ApiActionKeys.UPDATE_API:
            return {
                ...state,
                ...action.payload
            };
        case ApiActionKeys.GET_SØKERINFO:
            return {
                ...state,
                isLoadingSøkerinfo: true
            };
        case ApiActionKeys.GET_STORED_APP_STATE:
            return {
                ...state,
                isLoadingStoredAppState: true
            };
        case ApiActionKeys.DELETE_STORED_APP_STATE:
            return {
                ...state,
                isLoadingStoredAppState: true
            };
    }
    return state;
};

export default apiReducer;
