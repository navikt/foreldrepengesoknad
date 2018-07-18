import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/Person';
import { RegistrertAnnenForelder } from '../../types/søknad/AnnenForelder';
import Arbeidsforhold from '../../types/Arbeidsforhold';

export interface ApiState {
    person?: Person;
    arbeidsforhold?: Arbeidsforhold[];
    registrertAnnenForelder?: RegistrertAnnenForelder;
    isLoadingPerson: boolean;
    isLoadingAppState: boolean;
    error: any;
}

export type ApiStatePartial = Partial<ApiState>;

const getDefaultState = (): ApiState => ({
    person: undefined,
    arbeidsforhold: undefined,
    registrertAnnenForelder: undefined,
    isLoadingPerson: false,
    isLoadingAppState: true,
    error: {
        networkError: false,
        response: undefined
    }
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.UPDATE_API:
            return {
                ...state,
                ...action.payload
            };
        case ApiActionKeys.GET_SØKERINFO:
            return {
                ...state,
                isLoadingPerson: true
            };
        case ApiActionKeys.UPDATE_PERSON:
            return {
                ...state,
                person: {
                    ...state.person,
                    ...action.payload
                }
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
