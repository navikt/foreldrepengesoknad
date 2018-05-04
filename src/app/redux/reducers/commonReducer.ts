import {
    CommonActionKeys,
    CommonActionTypes
} from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';

const getDefaultState = (): CommonState => ({
    språkkode: 'nb',
    godkjentVilkar: false,
    bekreftetInformasjon: false
});

export interface CommonState {
    språkkode: Språkkode;
    godkjentVilkar: boolean;
    bekreftetInformasjon: boolean;
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
        case CommonActionKeys.SET_BEKREFTET_INFORMASJON:
            return updateCommonState(state, {
                bekreftetInformasjon: action.bekreftetInformasjon
            });
        case CommonActionKeys.SET_SPRÅK:
            return updateCommonState(state, { språkkode: action.språkkode });
        case CommonActionKeys.SET_GODKJENT_VILKAR:
            return updateCommonState(state, {
                godkjentVilkar: action.godkjentVilkar
            });
    }
    return state;
};

export default commonReducer;
