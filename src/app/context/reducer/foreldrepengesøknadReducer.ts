import { ForeldrepengesøknadContextAction, ForeldrepengesøknadContextActionKeys } from '../action/actionCreator';
import { ForeldrepengesøknadContextState, foreldrepengesøknadInitialState } from '../ForeldrepengesøknadContextConfig';

const foreldrepengesøknadReducer = (
    state: ForeldrepengesøknadContextState,
    action: ForeldrepengesøknadContextAction
): ForeldrepengesøknadContextState => {
    switch (action.type) {
        case ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    harGodkjentVilkår: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søkersituasjon: action.payload,
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_OMBARNET:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    barn: {
                        ...action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    annenForelder: {
                        ...action.payload,
                    },
                },
            };
        case ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknad: {
                    ...foreldrepengesøknadInitialState.søknad,
                },
            };
        case ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case ForeldrepengesøknadContextActionKeys.SET_SØKERINFO:
            return {
                ...state,
                søkerinfo: { ...action.payload },
            };
        default:
            return state;
    }
};

export default foreldrepengesøknadReducer;
