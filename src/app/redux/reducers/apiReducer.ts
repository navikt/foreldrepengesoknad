import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/Person';
import { DataOmAnnenForelder } from '../../types/søknad/AnnenForelder';
import Arbeidsforhold from '../../types/Arbeidsforhold';

export interface ApiReducerState {
    person?: Person;
    arbeidsforhold?: Arbeidsforhold[];
    dataOmAnnenForelder?: DataOmAnnenForelder;
    isLoadingPerson: boolean;
    error: any;
}

const getDefaultState = (): ApiReducerState => ({
    person: undefined,
    arbeidsforhold: undefined,
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
        case ApiActionKeys.GET_SØKERINFO_REQUEST:
            return {
                ...state,
                isLoadingPerson: true
            };
        case ApiActionKeys.GET_SØKERINFO_SUCCESS:
            return {
                ...state,
                person: action.person,
                arbeidsforhold: action.arbeidsforhold,
                isLoadingPerson: false
            };
        case ApiActionKeys.GET_SØKERINFO_FAILED:
            return {
                ...state,
                error: action.error,
                isLoadingPerson: false
            };
        case ApiActionKeys.UPDATE_PERSON:
            return {
                ...state,
                person: {
                    ...state.person,
                    ...action.payload
                }
            };
    }
    return state;
};

export default apiReducer;
