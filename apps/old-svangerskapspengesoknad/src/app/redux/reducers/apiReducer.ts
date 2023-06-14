import { Søkerinfo } from 'app/types/Søkerinfo';
import ApiAction, { ApiActionTypes } from '../types/ApiAction';
import FetchState, { FetchStatus } from 'app/types/FetchState';
import Kvittering from 'app/types/Kvittering';

export interface ApiState {
    søkerinfo: FetchState<Søkerinfo>;
    kvittering: FetchState<Kvittering>;
}

const getDefaultState = (): ApiState => ({
    søkerinfo: {
        status: FetchStatus.UNFETCHED,
    },
    kvittering: {
        status: FetchStatus.UNFETCHED,
    },
});

const apiReducer = (state = getDefaultState(), action: ApiAction): ApiState => {
    switch (action.type) {
        case ApiActionTypes.GET_SØKERINFO_REQUEST:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_SØKERINFO_SUCCESS:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.SUCCESS,
                    data: {
                        ...action.payload.søkerinfo,
                    },
                },
            };

        case ApiActionTypes.GET_SØKERINFO_FAILURE:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };

        case ApiActionTypes.SEND_SØKNAD_REQUEST:
            return {
                ...state,
                kvittering: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.SEND_SØKNAD_SUCCESS:
            return {
                ...state,
                kvittering: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.kvittering,
                },
            };

        case ApiActionTypes.SEND_SØKNAD_FAILURE:
            return {
                ...state,
                kvittering: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };

        default: {
            return state;
        }
    }
};

export default apiReducer;
