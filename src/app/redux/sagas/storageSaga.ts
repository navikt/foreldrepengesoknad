import { takeEvery, all, call, put, select, throttle } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as commonActions } from '../actions/common/commonActionCreators';
import { default as uttaksplanValideringActions } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { AppState } from '../reducers';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AxiosResponse } from 'axios';
import Søknad from '../../types/søknad/Søknad';

function* saveAppState() {
    try {
        const stateSelector = (state: AppState) => state;
        const appState: AppState = yield select(stateSelector);
        const { sensitivInfoIkkeLagre, ...søknad } = appState.søknad;
        const cleanedAppState: Partial<AppState> = {
            ...appState,
            søknad: søknad as Søknad
        };
        yield call(Api.storeAppState, cleanedAppState);
    } catch {
        yield put(
            apiActions.updateApi({
                isLoadingAppState: false
            })
        );
    }
}

function* applyStoredStateToApp(state: AppState) {
    if (Object.keys(state).length !== 0) {
        yield put(søknadActions.updateSøknad(state.søknad));
        yield put(commonActions.setSpråk(state.common.språkkode));
        yield put(uttaksplanValideringActions.validerUttaksplanAction());
    }
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
        } else {
            yield put(apiActions.updateApi({ isLoadingAppState: false }));
        }
    } catch {
        yield put(apiActions.updateApi({ isLoadingAppState: false }));
    }
}

function* deleteStoredAppState() {
    try {
        yield call(Api.deleteStoredAppState);
        yield put(
            apiActions.updateApi({
                isLoadingAppState: false
            })
        );
    } catch {
        yield put(
            apiActions.updateApi({
                isLoadingAppState: false
            })
        );
    }
}

const THROTTLE_INTERVAL_MS = 2500;

export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_STORED_APP_STATE, getAppState),
        takeEvery(ApiActionKeys.DELETE_STORED_APP_STATE, deleteStoredAppState),
        throttle(THROTTLE_INTERVAL_MS, ApiActionKeys.STORE_APP_STATE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, saveAppState)
    ]);
}
