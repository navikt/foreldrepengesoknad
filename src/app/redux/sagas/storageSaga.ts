import { takeEvery, all, call, put, select, throttle } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys, GetStoredAppState } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as commonActions } from '../actions/common/commonActionCreators';
import { default as uttaksplanValideringActions } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { AppState } from '../reducers';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AxiosResponse } from 'axios';
import Søknad from '../../types/søknad/Søknad';
import { cleanInvalidSøknadData } from '../../util/storageCleanup/storageCleanup';
import { isFeatureEnabled, Feature } from '../../Feature';
import { History } from 'history';
import routeConfig from '../../util/routing/routeConfig';

function* saveAppState(action: any) {
    try {
        const stateSelector = (state: AppState) => state;
        const appState: AppState = yield select(stateSelector);
        const { sensitivInfoIkkeLagre, ...søknad } = appState.søknad;
        const cleanedAppState = {
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

function* getAppState(action: GetStoredAppState) {
    try {
        put(apiActions.updateApi({ isLoadingAppState: true }));
        const response: AxiosResponse = yield call(Api.getStoredAppState);
        const state: AppState = response.data;
        if (state) {
            yield applyStoredStateToApp(state, action.history);
        }
    } catch {
        yield put(apiActions.updateApi({ isLoadingAppState: false }));
    } finally {
        yield put(apiActions.updateApi({ isLoadingAppState: false }));
    }
}

function* applyStoredStateToApp(state: AppState, history: History) {
    if (Object.keys(state).length !== 0) {
        const søknad: Søknad = cleanInvalidSøknadData(state.søknad);
        if (
            (søknad.erEndringssøknad && isFeatureEnabled(Feature.endringssøknad) === false) ||
            søknad.ekstrainfo.currentStegID === undefined
        ) {
            yield put(commonActions.setSpråk(state.common.språkkode));
            yield put(søknadActions.avbrytSøknad());
            history.push(routeConfig.APP_ROUTE_PREFIX);
        } else {
            if (isFeatureEnabled(Feature.endringssøknad)) {
                if (søknad.erEndringssøknad === undefined) {
                    søknad.erEndringssøknad = false;
                }
            } else {
                søknad.erEndringssøknad = false;
            }
            yield put(søknadActions.updateSøknad(søknad));
            yield put(commonActions.setSpråk(state.common.språkkode));
            yield put(uttaksplanValideringActions.validerUttaksplanAction());
        }
    }
}

function* deleteStoredAppState() {
    try {
        yield put(apiActions.updateApi({ isLoadingAppState: true }));
        yield call(Api.deleteStoredAppState);
    } catch {
        yield put(
            apiActions.updateApi({
                isLoadingAppState: false
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

const THROTTLE_INTERVAL_MS = 2500;
const THROTTLE_INTERVAL_UTTAKSPLAN = 15000;

export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_STORED_APP_STATE, getAppState),
        takeEvery(ApiActionKeys.DELETE_STORED_APP_STATE, deleteStoredAppState),
        throttle(THROTTLE_INTERVAL_MS, ApiActionKeys.STORE_APP_STATE, saveAppState),
        throttle(THROTTLE_INTERVAL_UTTAKSPLAN, SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_UTTAKSPLAN, SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_UTTAKSPLAN, SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, saveAppState)
    ]);
}
