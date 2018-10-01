import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as commonActions } from '../actions/common/commonActionCreators';
import { default as uttaksplanValideringActions } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { AppState } from '../reducers';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AxiosResponse } from 'axios';

function* saveAppState() {
    try {
        const stateSelector = (state: AppState) => state;
        const appState: AppState = yield select(stateSelector);
        const { sensitivInfoIkkeLagre, ...søknad } = appState.søknad;
        const cleanedAppState = {
            ...appState,
            søknad
        };
        yield call(Api.storeAppState, cleanedAppState);
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
    }
}

function* applyStoredStateToApp(state: AppState) {
    yield put(søknadActions.updateSøknad(state.søknad));
    yield put(commonActions.setSpråk(state.common.språkkode));
    yield put(uttaksplanValideringActions.validerUttaksplanAction());
    yield put(
        apiActions.updateApi({
            isLoadingAppState: false
        })
    );
}

function* getAppState(action: any) {
    try {
        const response: AxiosResponse = yield call(Api.getStoredAppState, action.params);
        const state: AppState = response.data;
        if (state) {
            yield applyStoredStateToApp(state);
        }
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
    } finally {
        yield put(apiActions.updateApi({ isLoadingAppState: false }));
    }
}

function* deleteStoredAppState() {
    try {
        yield call(Api.deleteStoredAppState);
    } catch (error) {
        yield put(
            apiActions.updateApi({
                error
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingAppState: false
            })
        );
    }
}

export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.STORE_APP_STATE, saveAppState),
        takeEvery(ApiActionKeys.GET_STORED_APP_STATE, getAppState),
        takeEvery(ApiActionKeys.DELETE_STORED_APP_STATE, deleteStoredAppState),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, saveAppState),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, saveAppState),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, saveAppState),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, saveAppState),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, saveAppState)
    ]);
}
