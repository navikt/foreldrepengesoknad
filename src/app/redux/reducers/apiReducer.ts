import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/Person';

export interface ApiReducerState {
    isLoadingPerson: boolean;
    person?: Person;
    error: any;
}

const getDefaultState = (): ApiReducerState => ({
    person: undefined,
    isLoadingPerson: false,
    error: {
        networkError: false,
        response: undefined
    }
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON:
            return {
                ...state,
                isLoadingPerson: true
            };
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return { ...state, person: action.person, isLoadingPerson: false };
        case ApiActionKeys.GET_PERSON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoadingPerson: false
            };
    }
    return state;
};

export default apiReducer;
