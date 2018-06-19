import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/Person';
import { DataOmAnnenForelder } from '../../types/søknad/AnnenForelder';

export interface ApiReducerState {
    person?: Person;
    dataOmAnnenForelder?: DataOmAnnenForelder;
    isLoadingPerson: boolean;
    error: any;
}

const getDefaultState = (): ApiReducerState => ({
    person: undefined,
    dataOmAnnenForelder: false
        ? {
              navn: 'pent navn',
              fnr: '01010101010',
              alder: '20',
              harOpplystOmSinPågåendeSak: true
          }
        : undefined,
    isLoadingPerson: false,
    error: {
        networkError: false,
        response: undefined
    }
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON_REQUEST:
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
