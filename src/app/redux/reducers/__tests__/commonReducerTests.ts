import { default as reducer, getDefaultCommonState } from '../commonReducer';
import actions from '../../actions/common/commonActionCreators';

const defaultState = getDefaultCommonState();

describe('commonReducer', () => {
    it('should initially set the correct default state', () => {
        const { språkkode } = defaultState;
        expect(språkkode).toBe('nb');
    });

    it('should set specified språkkode when SET_SPRÅK-action is dispatchhed', () => {
        const updatedCommonState = reducer(defaultState, actions.setSpråk('nn'));
        expect(updatedCommonState.språkkode).toBe('nn');
    });
});
