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
            };
        case ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...foreldrepengesøknadInitialState,
            };
        default:
            return state;
    }
};

export default foreldrepengesøknadReducer;
