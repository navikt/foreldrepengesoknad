import {
    SummaryActionTypes,
    SummaryActionKeys
} from '../actions/summary/summaryActionDefinitions';

export interface SummaryReducerState {
    godkjenteSteg: {};
}

const getDefaultState = (): SummaryReducerState => ({
    godkjenteSteg: {}
});

const summaryReducer = (
    state = getDefaultState(),
    action: SummaryActionTypes
) => {
    switch (action.type) {
        case SummaryActionKeys.APPROVE_STEP:
            return {
                ...state,
                godkjenteSteg: {
                    ...state.godkjenteSteg,
                    [action.stegID]: true
                }
            };
        case SummaryActionKeys.FLAG_STEP:
            const pathname = window.location.pathname;
            const stegID = pathname.substring(pathname.lastIndexOf('/') + 1);
            return {
                ...state,
                godkjenteSteg: {
                    ...state.godkjenteSteg,
                    [stegID]: false
                }
            };
    }
    return state;
};

export default summaryReducer;
