import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/Person';
import { DataOmAnnenForelder } from '../../types/søknad/AnnenForelder';
import Arbeidsforhold from '../../types/Arbeidsforhold';

export interface ApiState {
    person?: Person;
    arbeidsforhold?: Arbeidsforhold[];
    dataOmAnnenForelder?: DataOmAnnenForelder;
    isLoadingPerson: boolean;
    isLoadingAppState: boolean;
    mellomlagretSøknad: boolean;
    error: any;
}

export type ApiStatePartial = Partial<ApiState>;

const getDefaultState = (): ApiState => ({
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
    isLoadingAppState: false,
    mellomlagretSøknad: false,
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
        case ApiActionKeys.GET_APP_STATE:
            return {
                ...state,
                isLoadingAppState: true
            };
    }
    return state;
};

export default apiReducer;
