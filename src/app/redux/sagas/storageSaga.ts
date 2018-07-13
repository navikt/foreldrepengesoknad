import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as commonActions } from '../actions/common/commonActionCreators';
import { AppState } from '../reducers';
import summaryActionCreators from '../actions/summary/summaryActionCreators';

function* saveAppState() {
    try {
        const stateSelector = (state: any) => state;
        const appState = yield select(stateSelector);
        yield call(Api.storeAppState, appState);
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
    }
}

function* applyStoredStateToApp(state: AppState) {
    yield put(
        apiActions.updateApi({
            isLoadingAppState: false,
            mellomlagretSøknad: true
        })
    );
    yield put(søknadActions.updateSøknad(state.søknad));
    yield put(commonActions.setSpråk(state.common.språkkode));
    yield put(summaryActionCreators.updateSummary(state.summary));
}

function* getAppState(action: any) {
    try {
        const response = yield call(Api.getStoredAppState, action.params);
        const state: AppState = response.data;
        yield applyStoredStateToApp(state);
    } catch (error) {
        yield put(
            apiActions.updateApi({
                error,
                isLoadingAppState: false
            })
        );
    }
}
export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.STORE_APP_STATE, saveAppState),
        takeEvery(ApiActionKeys.GET_STORED_APP_STATE, getAppState)
    ]);
}
