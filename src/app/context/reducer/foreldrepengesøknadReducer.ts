import { ForeldrepengesøknadContextAction, ForeldrepengesøknadContextActionKeys } from '../action/actionCreator';
import { ForeldrepengesøknadContextState, foreldrepengesøknadInitialState } from '../ForeldrepengesøknadContextConfig';

const foreldrepengesøknadReducer = (
    state: ForeldrepengesøknadContextState,
    action: ForeldrepengesøknadContextAction
): ForeldrepengesøknadContextState => {
    switch (action.type) {
        case ForeldrepengesøknadContextActionKeys.SET_VELKOMMEN:
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
