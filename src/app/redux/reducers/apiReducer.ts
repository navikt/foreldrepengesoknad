import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person, { RegistrertAnnenForelder } from '../../types/Person';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { ForeldrepengesøknadResponse } from '../../types/ForeldrepengesøknadResponse';

export interface ApiState {
    person?: Person;
    arbeidsforhold?: Arbeidsforhold[];
    registrertAnnenForelder?: RegistrertAnnenForelder;
    isLoadingSøkerinfo: boolean;
    isLoadingAppState: boolean;
    søknadSendingInProgress: boolean;
    kvittering?: ForeldrepengesøknadResponse;
    error: any;
}

export type ApiStatePartial = Partial<ApiState>;

const getDefaultState = (): ApiState => ({
    person: undefined,
    arbeidsforhold: undefined,
    registrertAnnenForelder: undefined,
    isLoadingSøkerinfo: false,
    isLoadingAppState: true,
    søknadSendingInProgress: false,
    kvittering: undefined,
    error: {
        networkError: false,
        response: undefined
    }
});

const apiReducer = (
    state = getDefaultState(),
    action: ApiActionTypes
): ApiState => {
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
