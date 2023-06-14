import { Språkkode } from 'common/intl/types';
import CommonAction, { CommonActionTypes } from '../types/CommonAction';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
});

export interface CommonState {
    språkkode: Språkkode;
}

const commonReducer = (state = getDefaultCommonState(), action: CommonAction): CommonState => {
    switch (action.type) {
        case CommonActionTypes.SET_SPRÅK:
            return {
                ...state,
                språkkode: action.payload.språkkode,
            };
    }
    return state;
};

export default commonReducer;
