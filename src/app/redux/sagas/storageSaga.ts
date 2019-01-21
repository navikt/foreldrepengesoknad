import { takeEvery, all, call, put, select, throttle } from 'redux-saga/effects';
import _ from 'lodash';
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
import StorageSagaUtils from '../../util/storageSagaUtils';

const stateSelector = (state: AppState) => state;

function* saveAppState(action: any) {
    try {
        const appState: AppState = yield select(stateSelector);
        const { sensitivInfoIkkeLagre, ...søknad } = appState.søknad;
        const cleanedAppState = {
            ...appState,
            søknad: søknad as Søknad
        };

        yield call(Api.storeAppState, cleanedAppState);
    } catch (error) {
        const update = {
            isLoadingStoredAppState: false,
            ...(_.get(error, 'response.status') === 401 ? { sessionHasExpired: true } : {})
        };

        yield put(apiActions.updateApi(update));
    }
}

function* getAppState(action: GetStoredAppState) {
    try {
        put(apiActions.updateApi({ isLoadingStoredAppState: true }));
        const response: AxiosResponse = yield call(Api.getStoredAppState);
        const state: AppState = response.data;

        if (state) {
            yield applyStoredStateToApp(state, action.history);
        }
    } catch {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: false }));
    } finally {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: false, isLoadingInitialAppData: false }));
    }
}

function* applyStoredStateToApp(storedState: AppState, history: History) {
    if (Object.keys(storedState).length !== 0) {
        const appState: AppState = yield select(stateSelector);
        const søknad: Søknad = cleanInvalidSøknadData(storedState.søknad);
        søknad.søker = StorageSagaUtils.upgradeAndreInntekterFromV1ToV2(søknad.søker);
        const { søkerinfo } = appState.api;

        if (isFeatureEnabled(Feature.registrertBarn) === false) {
            delete søknad.ekstrainfo.søknadenGjelderBarnValg;
        } else {
            if (søknad.ekstrainfo.søknadenGjelderBarnValg === undefined) {
                søknad.ekstrainfo.søknadenGjelderBarnValg = {
                    gjelderAnnetBarn: søknad.barn.erBarnetFødt !== undefined,
                    valgteBarn: []
                };
            }
        }

        const valgteRegistrerteBarn = StorageSagaUtils.getValgteRegistrerteBarnISøknaden(søknad);
        const registrerteBarn = søkerinfo ? søkerinfo.registrerteBarn : undefined;

        if (
            søkerinfo === undefined ||
            søknad.ekstrainfo.currentStegID === undefined ||
            (valgteRegistrerteBarn !== undefined &&
                StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteRegistrerteBarn, registrerteBarn) ===
                    false)
        ) {
            yield put(commonActions.setSpråk(storedState.common.språkkode));
            yield put(søknadActions.avbrytSøknad());
            history.push(routeConfig.APP_ROUTE_PREFIX);
        } else {
            if (søknad.erEndringssøknad === undefined) {
                søknad.erEndringssøknad = false;
            }
            yield put(søknadActions.updateSøknad(søknad));

            if (valgteRegistrerteBarn) {
                yield put(søknadActions.updateSøknadenGjelderBarn({ valgteBarn: valgteRegistrerteBarn }));
            }

            yield put(commonActions.setSpråk(storedState.common.språkkode));
            yield put(uttaksplanValideringActions.validerUttaksplanAction());
        }
    }
}

function* deleteStoredAppState() {
    try {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: true }));
        yield call(Api.deleteStoredAppState);
    } catch {
        yield put(
            apiActions.updateApi({
                isLoadingStoredAppState: false
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingStoredAppState: false,
                isLoadingInitialAppData: false
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
