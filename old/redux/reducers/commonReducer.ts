import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from 'common/intl/types';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
});

export interface CommonState {
    språkkode: Språkkode;
}

const commonReducer = (state = getDefaultCommonState(), action: CommonActionTypes): CommonState => {
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
    }
    return state;
};

export default commonReducer;
