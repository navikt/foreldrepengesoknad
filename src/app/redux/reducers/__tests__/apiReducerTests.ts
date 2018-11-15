import { default as reducer, getDefaultApiState } from '../apiReducer';
import actions from '../../actions/api/apiActionCreators';

const defaultState = getDefaultApiState();

describe('apiReducer', () => {
    it('should initially set the correct default state', () => {
        const {
            isLoadingSøkerinfo,
            isLoadingAppState,
            isLoadingTilgjengeligeStønadskontoer,
            søknadSendingInProgress,
            søknadHasBeenReceived,
            tilgjengeligeStønadskontoer
        } = defaultState;

        expect(isLoadingSøkerinfo).toBe(true);
        expect(isLoadingAppState).toBe(true);
        expect(isLoadingTilgjengeligeStønadskontoer).toBe(false);
        expect(søknadSendingInProgress).toBe(false);
        expect(søknadHasBeenReceived).toBe(false);
        expect(tilgjengeligeStønadskontoer).toBeInstanceOf(Array);
        expect(tilgjengeligeStønadskontoer).toHaveLength(0);
    });

    it('should update specified props of api state when UPDATE_API-action is dispatched', () => {
        const updatedApiState = reducer(defaultState, actions.updateApi({ isLoadingSøkerinfo: false }));
        expect(updatedApiState.isLoadingSøkerinfo).toBe(false);
    });

    it('should set isLoadingSøkerinfo to true when GET_SØKERINFO-action is dispatched', () => {
        const updatedApiState = reducer(defaultState, actions.getSøkerinfo({} as any));
        expect(updatedApiState.isLoadingSøkerinfo).toBe(true);
    });

    it('should set isLoadingAppState to true when GET_STORED_APP_STATE-action is dispatched', () => {
        const updatedApiState = reducer(defaultState, actions.getStoredAppState({} as any));
        expect(updatedApiState.isLoadingAppState).toBe(true);
    });

    it('should set isLoadingAppState to true when DELETE_STORED_APP_STATE-action is dispatched', () => {
        const updatedApiState = reducer(defaultState, actions.deleteStoredAppState());
        expect(updatedApiState.isLoadingAppState).toBe(true);
    });
});
