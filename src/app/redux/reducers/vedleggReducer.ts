import {
    SøknadActionKeys,
    UpdateSøknadState,
    UpdateUtenlandsopphold
} from '../actions/søknad/søknadActionDefinitions';
import Barn from '../types/domain/Barn';

const getDefaultState = (): Barn => {
    return {};
};

const barnReducer = (
    state = getDefaultState(),
    action: UpdateSøknadState | UpdateUtenlandsopphold
) => {
    switch (action.type) {
        case SøknadActionKeys.UPDATE_SØKNAD_STATE:
            return {
                ...state,
                ...action.payload
            };
        case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
            return {
                ...state,
                utenlandsopphold: updateUtenlandsoppholdState(
                    action.payload,
                    state.barn || []
                )
            };
    }
    return state;
};

export default barnReducer;
