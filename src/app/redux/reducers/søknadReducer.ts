import { SøknadPartial } from '../../types/søknad/Søknad';
import {
    SøknadAction,
    SøknadActionKeys
} from '../actions/søknad/søknadActionDefinitions';

const getDefaultState = (): SøknadPartial => {
    return {
        søker: {}
    };
};

const søknadReducer = (state = getDefaultState(), action: SøknadAction) => {
    switch (action.type) {
        case SøknadActionKeys.UPDATE_SØKER:
            return {
                ...state,
                søker: { ...state.søker, ...action.payload }
            };
    }
    return state;
};

export default søknadReducer;
