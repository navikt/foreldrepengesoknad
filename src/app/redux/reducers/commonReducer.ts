import {
    CommonActionKeys,
    CommonActionTypes
} from '../actions/common/commonActionDefinitions';
import { Språkkode } from 'common/intl/types';

const getDefaultState = (): CommonState => ({
    språkkode: 'nb'
});

export interface CommonState {
    språkkode: Språkkode;
}
type CommonStatePartial = Partial<CommonState>;

// Hjelper til med typesjekking
const updateCommonState = (
    state: CommonState,
    newStatePartial: CommonStatePartial
): CommonState => ({
    ...state,
    ...newStatePartial
});

const commonReducer = (
    state = getDefaultState(),
    action: CommonActionTypes
) => {
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return updateCommonState(state, { språkkode: action.språkkode });
    }
    return state;
};

export default commonReducer;
