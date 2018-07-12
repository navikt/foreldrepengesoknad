import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';

function* saveAppState() {
    try {
        const stateSelector = (state: any) => state;
        const appState = yield select(stateSelector);
        yield call(Api.saveAppState, appState);
    } catch (error) {
        yield put({ type: ApiActionKeys.SAVE_APP_STATE_FAILED, error });
    }
}

function* getAppState(action: any) {
    try {
        const response = yield call(Api.getAppState, action.params);
        const storedAppState = response.data;
        yield put({
            type: ApiActionKeys.GET_APP_STATE_SUCCESS,
            storedAppState
        });
    } catch (error) {
        yield put({ type: ApiActionKeys.GET_APP_STATE_FAILED, error });
    }
}
export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.SAVE_APP_STATE, saveAppState),
        takeEvery(ApiActionKeys.GET_APP_STATE, getAppState)
    ]);
}
