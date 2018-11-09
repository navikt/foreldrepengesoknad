import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import { Kvittering } from '../../types/Kvittering';
import { Søkerinfo } from '../../types/søkerinfo';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';

export interface ApiState {
    søkerinfo?: Søkerinfo;
    isLoadingSøkerinfo: boolean;
    isLoadingAppState: boolean;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    søknadSendingInProgress: boolean;
    søknadHasBeenReceived: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    kvittering?: Kvittering;
    dekningsgrad100AntallUker?: number;
    dekningsgrad80AntallUker?: number;
}

export type ApiStatePartial = Partial<ApiState>;

const getDefaultState = (): ApiState => ({
    isLoadingSøkerinfo: true,
    isLoadingAppState: false,
    isLoadingTilgjengeligeStønadskontoer: false,
    søknadSendingInProgress: false,
    søknadHasBeenReceived: false,
    tilgjengeligeStønadskontoer: []
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes): ApiStatePartial => {
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
                isLoadingAppState: true
            };
        case ApiActionKeys.DELETE_STORED_APP_STATE:
            return {
                ...state,
                isLoadingAppState: true
            };
    }
    return state;
};

export default apiReducer;
